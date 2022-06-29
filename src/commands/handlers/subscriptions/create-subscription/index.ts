import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreateSubscriptionCommand } from '@/commands/implements/subscriptions/create-subscription.command';
import {
  SubscriptionNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CreateSubscriptionRepository } from '@/repositories/subscriptions/create-subscription';

type CreateSubscriptionCommandKeys = keyof CreateSubscriptionCommand;

@CommandHandler(CreateSubscriptionCommand)
export class CreateSubscriptionCommandHandler
  implements ICommandHandler<CreateSubscriptionCommand>
{
  constructor(
    private readonly createSubscriptionRepository: CreateSubscriptionRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateSubscriptionCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.parent) {
      throw new ParamNotFoundException<CreateSubscriptionCommandKeys>('parent');
    }

    const subscriptionCreated = await this.createSubscriptionRepository.execute(
      data
    );
    if (!subscriptionCreated) {
      throw new SubscriptionNotFoundException();
    }
    const subscriptionModel =
      this.publisher.mergeObjectContext(subscriptionCreated);
    subscriptionModel.createdSubscription({
      createdBy: data.createdBy
    });
    subscriptionModel.commit();

    return subscriptionCreated;
  }

  private clearData(
    command: CreateSubscriptionCommand
  ): CreateSubscriptionCommand {
    return cleanObject({
      name: cleanValue(command?.name),
      parent: cleanValue(command?.parent)
    });
  }
}
