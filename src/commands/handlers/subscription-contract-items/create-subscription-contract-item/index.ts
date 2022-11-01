import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, cleanValueNumber } from '@stokei/nestjs';

import { CreateSubscriptionContractItemCommand } from '@/commands/implements/subscription-contract-items/create-subscription-contract-item.command';
import {
  AppNotFoundException,
  DataNotFoundException,
  ParamNotFoundException,
  PriceNotFoundException,
  SubscriptionContractItemNotFoundException,
  SubscriptionContractNotFoundException
} from '@/errors';
import { CreateSubscriptionContractItemRepository } from '@/repositories/subscription-contract-items/create-subscription-contract-item';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';
import { FindPriceByIdService } from '@/services/prices/find-price-by-id';
import { CreateStripeSubscriptionItemService } from '@/services/stripe/create-stripe-subscription-item';
import { FindSubscriptionContractByIdService } from '@/services/subscription-contracts/find-subscription-contract-by-id';

type CreateSubscriptionContractItemCommandKeys =
  keyof CreateSubscriptionContractItemCommand;

@CommandHandler(CreateSubscriptionContractItemCommand)
export class CreateSubscriptionContractItemCommandHandler
  implements ICommandHandler<CreateSubscriptionContractItemCommand>
{
  constructor(
    private readonly createSubscriptionContractItemRepository: CreateSubscriptionContractItemRepository,
    private readonly createStripeSubscriptionItemService: CreateStripeSubscriptionItemService,
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
    if (!data?.price) {
      throw new ParamNotFoundException<CreateSubscriptionContractItemCommandKeys>(
        'price'
      );
    }
    if (!data?.product) {
      throw new ParamNotFoundException<CreateSubscriptionContractItemCommandKeys>(
        'product'
      );
    }

    const price = await this.findPriceByIdService.execute(data.price);
    if (!price) {
      throw new PriceNotFoundException();
    }
    const subscriptionContract =
      await this.findSubscriptionContractByIdService.execute(data.parent);
    if (!subscriptionContract) {
      throw new SubscriptionContractNotFoundException();
    }
    const app = await this.findAppByIdService.execute(data.app);
    if (!app) {
      throw new AppNotFoundException();
    }

    const existsStripeSubscriptionItem = !!data?.stripeSubscriptionItem;
    let stripeSubscriptionItemId = data.stripeSubscriptionItem;
    if (!existsStripeSubscriptionItem) {
      const stripeSubscriptionItem =
        await this.createStripeSubscriptionItemService.execute({
          price: price.stripePrice,
          quantity: data.quantity,
          subscription: subscriptionContract.stripeSubscription,
          stripeAccount: app.stripeAccount
        });
      if (!stripeSubscriptionItem) {
        throw new SubscriptionContractItemNotFoundException();
      }
      stripeSubscriptionItemId = stripeSubscriptionItem.id;
    }

    const subscriptionContractItemCreated =
      await this.createSubscriptionContractItemRepository.execute({
        ...data,
        stripeSubscriptionItem: stripeSubscriptionItemId
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
      stripeSubscriptionItem: cleanValue(command?.stripeSubscriptionItem),
      recurring: cleanValue(command?.recurring)
    });
  }
}
