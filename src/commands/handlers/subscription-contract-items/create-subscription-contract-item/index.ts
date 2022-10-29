import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, cleanValueNumber } from '@stokei/nestjs';

import { CreateSubscriptionContractItemCommand } from '@/commands/implements/subscription-contract-items/create-subscription-contract-item.command';
import {
  DataNotFoundException,
  ParamNotFoundException,
  SubscriptionContractItemNotFoundException
} from '@/errors';
import { CreateSubscriptionContractItemRepository } from '@/repositories/subscription-contract-items/create-subscription-contract-item';

type CreateSubscriptionContractItemCommandKeys =
  keyof CreateSubscriptionContractItemCommand;

@CommandHandler(CreateSubscriptionContractItemCommand)
export class CreateSubscriptionContractItemCommandHandler
  implements ICommandHandler<CreateSubscriptionContractItemCommand>
{
  constructor(
    private readonly createSubscriptionContractItemRepository: CreateSubscriptionContractItemRepository,
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
    const subscriptionContractItemCreated =
      await this.createSubscriptionContractItemRepository.execute(data);
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
