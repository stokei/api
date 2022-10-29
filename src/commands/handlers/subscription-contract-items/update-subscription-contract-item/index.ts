import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import {
  cleanObject,
  cleanValue,
  cleanValueNumber,
  splitServiceId
} from '@stokei/nestjs';

import { UpdateSubscriptionContractItemCommand } from '@/commands/implements/subscription-contract-items/update-subscription-contract-item.command';
import {
  DataNotFoundException,
  ParamNotFoundException,
  SubscriptionContractItemNotFoundException
} from '@/errors';
import { FindSubscriptionContractItemByIdRepository } from '@/repositories/subscription-contract-items/find-subscription-contract-item-by-id';
import { UpdateSubscriptionContractItemRepository } from '@/repositories/subscription-contract-items/update-subscription-contract-item';

@CommandHandler(UpdateSubscriptionContractItemCommand)
export class UpdateSubscriptionContractItemCommandHandler
  implements ICommandHandler<UpdateSubscriptionContractItemCommand>
{
  constructor(
    private readonly findSubscriptionContractItemByIdRepository: FindSubscriptionContractItemByIdRepository,
    private readonly updateSubscriptionContractItemRepository: UpdateSubscriptionContractItemRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdateSubscriptionContractItemCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    const subscriptionContractItemId = splitServiceId(
      data.where?.subscriptionContractItem
    )?.id;
    if (!subscriptionContractItemId) {
      throw new ParamNotFoundException('subscriptionContractItemId');
    }

    const subscriptionContractItem =
      await this.findSubscriptionContractItemByIdRepository.execute(
        subscriptionContractItemId
      );
    if (!subscriptionContractItem) {
      throw new SubscriptionContractItemNotFoundException();
    }

    const updated = await this.updateSubscriptionContractItemRepository.execute(
      {
        ...data,
        where: {
          ...data.where,
          subscriptionContractItem: subscriptionContractItemId
        }
      }
    );
    if (!updated) {
      throw new DataNotFoundException();
    }

    const subscriptionContractItemUpdated =
      await this.findSubscriptionContractItemByIdRepository.execute(
        subscriptionContractItemId
      );
    if (!subscriptionContractItemUpdated) {
      throw new SubscriptionContractItemNotFoundException();
    }
    const subscriptionContractItemModel = this.publisher.mergeObjectContext(
      subscriptionContractItemUpdated
    );
    subscriptionContractItemModel.updatedSubscriptionContractItem({
      updatedBy: data.data.updatedBy
    });
    subscriptionContractItemModel.commit();

    return subscriptionContractItemUpdated;
  }

  private clearData(
    command: UpdateSubscriptionContractItemCommand
  ): UpdateSubscriptionContractItemCommand {
    return cleanObject({
      where: cleanObject({
        app: cleanValue(command?.where?.app),
        subscriptionContractItem: cleanValue(
          command?.where?.subscriptionContractItem
        )
      }),
      data: cleanObject({
        quantity: cleanValueNumber(command?.data?.quantity),
        updatedBy: cleanValue(command?.data?.updatedBy)
      })
    });
  }
}
