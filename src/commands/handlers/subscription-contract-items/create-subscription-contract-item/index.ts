import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import {
  cleanObject,
  cleanValue,
  cleanValueBoolean,
  cleanValueNumber
} from '@stokei/nestjs';

import { CreateSubscriptionContractItemCommand } from '@/commands/implements/subscription-contract-items/create-subscription-contract-item.command';
import {
  AppNotFoundException,
  DataNotFoundException,
  ParamNotFoundException,
  PriceNotFoundException,
  SubscriptionContractItemNotFoundException,
  SubscriptionContractNotFoundException
} from '@/errors';
import { PriceModel } from '@/models/price.model';
import { CreateSubscriptionContractItemRepository } from '@/repositories/subscription-contract-items/create-subscription-contract-item';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';
import { FindPriceByIdService } from '@/services/prices/find-price-by-id';
import { FindSubscriptionContractByIdService } from '@/services/subscription-contracts/find-subscription-contract-by-id';

type CreateSubscriptionContractItemCommandKeys =
  keyof CreateSubscriptionContractItemCommand;

@CommandHandler(CreateSubscriptionContractItemCommand)
export class CreateSubscriptionContractItemCommandHandler
  implements ICommandHandler<CreateSubscriptionContractItemCommand>
{
  constructor(
    private readonly createSubscriptionContractItemRepository: CreateSubscriptionContractItemRepository,
    private readonly findSubscriptionContractByIdService: FindSubscriptionContractByIdService,
    private readonly findPriceByIdService: FindPriceByIdService,
    private readonly findAppByIdService: FindAppByIdService,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateSubscriptionContractItemCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.parent) {
      throw new ParamNotFoundException<CreateSubscriptionContractItemCommandKeys>(
        'parent'
      );
    }
    if (!data?.product) {
      throw new ParamNotFoundException<CreateSubscriptionContractItemCommandKeys>(
        'product'
      );
    }
    const { createdByAdmin, ...dataSubscriptionItemCreated } = data;

    let price: PriceModel;
    const priceIsRequired = !createdByAdmin;
    if (!!priceIsRequired) {
      if (!data?.price) {
        throw new ParamNotFoundException<CreateSubscriptionContractItemCommandKeys>(
          'price'
        );
      }
      price = await this.findPriceByIdService.execute(data.price);
      if (!price) {
        throw new PriceNotFoundException();
      }
    }
    dataSubscriptionItemCreated.quantity = dataSubscriptionItemCreated.quantity
      ? Math.round(dataSubscriptionItemCreated.quantity)
      : 0;

    const subscriptionContract =
      await this.findSubscriptionContractByIdService.execute(data.parent);
    if (!subscriptionContract) {
      throw new SubscriptionContractNotFoundException();
    }
    const app = await this.findAppByIdService.execute(data.app);
    if (!app) {
      throw new AppNotFoundException();
    }

    const subscriptionContractItemCreated =
      await this.createSubscriptionContractItemRepository.execute({
        ...dataSubscriptionItemCreated,
        recurring: data.recurring || price?.recurring,
        stripeSubscriptionItem: data.stripeSubscriptionItem
      });
    if (!subscriptionContractItemCreated) {
      throw new SubscriptionContractItemNotFoundException();
    }
    const subscriptionContractItemModel = this.publisher.mergeObjectContext(
      subscriptionContractItemCreated
    );
    subscriptionContractItemModel.createdSubscriptionContractItem({
      createdBy: data.createdBy
    });
    subscriptionContractItemModel.commit();

    return subscriptionContractItemCreated;
  }

  private clearData(
    command: CreateSubscriptionContractItemCommand
  ): CreateSubscriptionContractItemCommand {
    return cleanObject({
      createdBy: cleanValue(command?.createdBy),
      app: cleanValue(command?.app),
      parent: cleanValue(command?.parent),
      product: cleanValue(command?.product),
      quantity: cleanValueNumber(command?.quantity),
      price: cleanValue(command?.price),
      createdByAdmin: cleanValueBoolean(command?.createdByAdmin),
      stripeSubscriptionItem: cleanValue(command?.stripeSubscriptionItem),
      recurring: cleanValue(command?.recurring)
    });
  }
}
