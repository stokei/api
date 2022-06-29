import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { RemoveSubscriptionCommand } from '@/commands/implements/subscriptions/remove-subscription.command';
import {
  SubscriptionNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindSubscriptionByIdRepository } from '@/repositories/subscriptions/find-subscription-by-id';
import { RemoveSubscriptionRepository } from '@/repositories/subscriptions/remove-subscription';

type RemoveSubscriptionCommandKeys = keyof RemoveSubscriptionCommand;

@CommandHandler(RemoveSubscriptionCommand)
export class RemoveSubscriptionCommandHandler
  implements ICommandHandler<RemoveSubscriptionCommand>
{
  constructor(
    private readonly findSubscriptionByIdRepository: FindSubscriptionByIdRepository,
    private readonly removeSubscriptionRepository: RemoveSubscriptionRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemoveSubscriptionCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data.where?.removedBy) {
      throw new ParamNotFoundException('removedBy');
    }
    const subscriptionId = splitServiceId(data.where?.subscriptionId)?.id;
    if (!subscriptionId) {
      throw new ParamNotFoundException('subscriptionId');
    }

    const subscription = await this.findSubscriptionByIdRepository.execute(
      subscriptionId
    );
    if (!subscription) {
      throw new SubscriptionNotFoundException();
    }

    const removed = await this.removeSubscriptionRepository.execute({
      where: {
        ...data.where,
        subscriptionId
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const subscriptionModel = this.publisher.mergeObjectContext(subscription);
    subscriptionModel.removedSubscription({
      removedBy: data.where.removedBy
    });
    subscriptionModel.commit();

    return subscription;
  }

  private clearData(
    command: RemoveSubscriptionCommand
  ): RemoveSubscriptionCommand {
    return cleanObject({
      where: cleanObject({
        removedBy: cleanValue(command?.where?.removedBy),
        subscriptionId: cleanValue(command?.where?.subscriptionId)
      })
    });
  }
}
