import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import {
  cleanObject,
  cleanValue,
  cleanValueBoolean,
  cleanValueNumber
} from '@stokei/nestjs';

import { CreatePriceCommand } from '@/commands/implements/prices/create-price.command';
import { PriceType } from '@/enums/price-type.enum';
import {
  AppNotFoundException,
  DataNotFoundException,
  ParamNotFoundException,
  PriceNotFoundException,
  ProductNotFoundException,
  RecurringNotFoundException
} from '@/errors';
import { RecurringModel } from '@/models/recurring.model';
import { CreatePriceRepository } from '@/repositories/prices/create-price';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';
import { FindProductByIdService } from '@/services/products/find-product-by-id';
import { CreateRecurringService } from '@/services/recurrings/create-recurring';
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
    private readonly createRecurringService: CreateRecurringService,
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
    let recurring: RecurringModel;
    if (data.type === PriceType.RECURRING) {
      recurring = await this.createRecurringService.execute(data.recurring);
      if (!recurring) {
        throw new RecurringNotFoundException();
      }
    }

    const stripePrice = await this.createStripePriceService.execute({
      amount: data.amount,
      currency: data.currency,
      app: app.id,
      recurring,
      type: data.type,
      stripeProduct: product.stripeProduct,
      stripeAccount: app.stripeAccount
    });

    const priceCreated = await this.createPriceRepository.execute({
      ...data,
      recurring: recurring?.id,
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
      parent: cleanValue(command?.parent),
      default: cleanValueBoolean(command?.default),
      fromAmount: cleanValueNumber(command?.fromAmount),
      amount: cleanValueNumber(command?.amount),
      currency: cleanValue(command?.currency),
      type: cleanValue(command?.type),
      inventoryType: cleanValue(command?.inventoryType),
      billingScheme: cleanValue(command?.billingScheme),
      tiersMode: cleanValue(command?.tiersMode),
      recurring: command?.recurring,
      quantity: cleanValueNumber(command?.quantity),
      app: cleanValue(command?.app),
      createdBy: cleanValue(command?.createdBy)
    });
  }
}
