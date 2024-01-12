import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { RemoveSubscriptionContractItemCommand } from '@/commands/implements/subscription-contract-items/remove-subscription-contract-item.command';
import {
  DataNotFoundException,
  ParamNotFoundException,
  SubscriptionContractItemNotFoundException
} from '@/errors';
import { RemoveSubscriptionContractItemRepository } from '@/repositories/subscription-contract-items/remove-subscription-contract-item';
import { FindSubscriptionContractItemByIdService } from '@/services/subscription-contract-items/find-subscription-contract-item-by-id';

@CommandHandler(RemoveSubscriptionContractItemCommand)
export class RemoveSubscriptionContractItemCommandHandler
  implements ICommandHandler<RemoveSubscriptionContractItemCommand>
{
  constructor(
    private readonly findSubscriptionContractItemByIdService: FindSubscriptionContractItemByIdService,
    private readonly removeSubscriptionContractItemRepository: RemoveSubscriptionContractItemRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemoveSubscriptionContractItemCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data.where?.removedBy) {
      throw new ParamNotFoundException('removedBy');
    }
    const subscriptionContractItemId = splitServiceId(
      data.where?.subscriptionContractItem
    )?.id;
    if (!subscriptionContractItemId) {
      throw new ParamNotFoundException('subscriptionContractItemId');
    }

    const subscriptionContractItem =
      await this.findSubscriptionContractItemByIdService.execute(
        data.where?.subscriptionContractItem
      );
    if (!subscriptionContractItem) {
      throw new SubscriptionContractItemNotFoundException();
    }

    const removed = await this.removeSubscriptionContractItemRepository.execute(
      {
        where: {
          ...data.where,
          subscriptionContractItem: subscriptionContractItemId
        }
      }
    );
    if (!removed) {
      throw new DataNotFoundException();
    }

    const subscriptionContractItemModel = this.publisher.mergeObjectContext(
      subscriptionContractItem
    );
    subscriptionContractItemModel.removedSubscriptionContractItem({
      removedBy: data.where.removedBy
    });
    subscriptionContractItemModel.commit();

    return subscriptionContractItem;
  }

  private clearData(
    command: RemoveSubscriptionContractItemCommand
  ): RemoveSubscriptionContractItemCommand {
    return cleanObject({
      where: cleanObject({
        removedBy: cleanValue(command?.where?.removedBy),
        app: cleanValue(command?.where?.app),
        subscriptionContractItem: cleanValue(
          command?.where?.subscriptionContractItem
        )
      })
    });
  }
}
