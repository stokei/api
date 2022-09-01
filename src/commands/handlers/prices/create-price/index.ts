import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import {
  cleanObject,
  cleanValue,
  cleanValueBoolean,
  cleanValueNumber
} from '@stokei/nestjs';

import { CreatePriceCommand } from '@/commands/implements/prices/create-price.command';
import {
  AppNotFoundException,
  DataNotFoundException,
  ParamNotFoundException,
  PriceNotFoundException,
  ProductNotFoundException
} from '@/errors';
import { CreatePriceRepository } from '@/repositories/prices/create-price';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';
import { FindProductByIdService } from '@/services/products/find-product-by-id';
import { CreateStripePriceService } from '@/services/stripe/create-stripe-price';

type CreatePriceCommandKeys = keyof CreatePriceCommand;

@CommandHandler(CreatePriceCommand)
export class CreatePriceCommandHandler
  implements ICommandHandler<CreatePriceCommand>
{
  constructor(
    private readonly createPriceRepository: CreatePriceRepository,
    private readonly createStripePriceService: CreateStripePriceService,
    private readonly findAppByIdService: FindAppByIdService,
    private readonly findProductByIdService: FindProductByIdService,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreatePriceCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.parent) {
      throw new ParamNotFoundException<CreatePriceCommandKeys>('parent');
    }
    if (!data?.currency) {
      throw new ParamNotFoundException<CreatePriceCommandKeys>('currency');
    }
    if (!data?.app) {
      throw new ParamNotFoundException<CreatePriceCommandKeys>('app');
    }

    const app = await this.findAppByIdService.execute(data.app);
    if (!app) {
      throw new AppNotFoundException();
    }
    const product = await this.findProductByIdService.execute(data.parent);
    if (!product) {
      throw new ProductNotFoundException();
    }

    const stripePrice = await this.createStripePriceService.execute({
      amount: data.amount,
      currency: data.currency,
      app: app.id,
      recurringIntervalCount: data.recurringIntervalCount,
      recurringIntervalType: data.recurringIntervalType,
      type: data.type,
      stripeProduct: product.stripeProduct,
      stripeAccount: app.stripeAccount
    });

    const priceCreated = await this.createPriceRepository.execute({
      ...data,
      stripePrice: stripePrice.id
    });
    if (!priceCreated) {
      throw new PriceNotFoundException();
    }
    const priceModel = this.publisher.mergeObjectContext(priceCreated);
    priceModel.createdPrice({
      createdBy: data.createdBy
    });
    priceModel.commit();

    return priceCreated;
  }

  private clearData(command: CreatePriceCommand): CreatePriceCommand {
    return cleanObject({
      createdBy: cleanValue(command?.createdBy),
      app: cleanValue(command?.app),
      currency: cleanValue(command?.currency),
      default: cleanValueBoolean(command?.default),
      fromAmount: cleanValueNumber(command?.fromAmount),
      amount: cleanValueNumber(command?.amount),
      type: command?.type,
      inventoryType: command?.inventoryType,
      recurringIntervalCount: cleanValueNumber(command?.recurringIntervalCount),
      recurringIntervalType: command?.recurringIntervalType,
      quantity: cleanValueNumber(command?.quantity),
      parent: cleanValue(command?.parent)
    });
  }
}
