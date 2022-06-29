import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { UpdateSubscriptionCommand } from '@/commands/implements/subscriptions/update-subscription.command';
import {
  SubscriptionNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindSubscriptionByIdRepository } from '@/repositories/subscriptions/find-subscription-by-id';
import { UpdateSubscriptionRepository } from '@/repositories/subscriptions/update-subscription';

type UpdateSubscriptionCommandKeys = keyof UpdateSubscriptionCommand;

@CommandHandler(UpdateSubscriptionCommand)
export class UpdateSubscriptionCommandHandler
  implements ICommandHandler<UpdateSubscriptionCommand>
{
  constructor(
    private readonly findSubscriptionByIdRepository: FindSubscriptionByIdRepository,
    private readonly updateSubscriptionRepository: UpdateSubscriptionRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdateSubscriptionCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
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

    const updated = await this.updateSubscriptionRepository.execute({
      ...data,
      where: {
        ...data.where,
        subscriptionId
      }
    });
    if (!updated) {
      throw new DataNotFoundException();
    }

    const subscriptionUpdated =
      await this.findSubscriptionByIdRepository.execute(subscriptionId);
    if (!subscriptionUpdated) {
      throw new SubscriptionNotFoundException();
    }
    const subscriptionModel =
      this.publisher.mergeObjectContext(subscriptionUpdated);
    subscriptionModel.updatedSubscription();
    subscriptionModel.commit();

    return subscriptionUpdated;
  }

  private clearData(
    command: UpdateSubscriptionCommand
  ): UpdateSubscriptionCommand {
    return cleanObject({
      where: cleanObject({
        subscriptionId: cleanValue(command?.where?.subscriptionId)
      }),
      data: cleanObject({
        name: cleanValue(command?.data?.name),
        updatedBy: cleanValue(command?.data?.updatedBy)
      })
    });
  }
}
