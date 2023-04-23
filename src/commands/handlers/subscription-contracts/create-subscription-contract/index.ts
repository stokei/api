import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, cleanValueBoolean } from '@stokei/nestjs';

import { CreateSubscriptionContractCommand } from '@/commands/implements/subscription-contracts/create-subscription-contract.command';
import { SubscriptionContractStatus } from '@/enums/subscription-contract-status.enum';
import {
  DataNotFoundException,
  ParamNotFoundException,
  SubscriptionContractNotFoundException
} from '@/errors';
import { CreateSubscriptionContractRepository } from '@/repositories/subscription-contracts/create-subscription-contract';

type CreateSubscriptionContractCommandKeys =
  keyof CreateSubscriptionContractCommand;

@CommandHandler(CreateSubscriptionContractCommand)
export class CreateSubscriptionContractCommandHandler
  implements ICommandHandler<CreateSubscriptionContractCommand>
{
  constructor(
    private readonly createSubscriptionContractRepository: CreateSubscriptionContractRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateSubscriptionContractCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.parent) {
      throw new ParamNotFoundException<CreateSubscriptionContractCommandKeys>(
        'parent'
      );
    }
    if (!data?.app) {
      throw new ParamNotFoundException<CreateSubscriptionContractCommandKeys>(
        'app'
      );
    }

    const subscriptionContractCreated =
      await this.createSubscriptionContractRepository.execute({
        app: data.app,
        automaticRenew: data.automaticRenew,
        createdBy: data.createdBy,
        parent: data.parent,
        paymentMethod: data.paymentMethod,
        stripeSubscription: data.stripeSubscription,
        type: data.type,
        active: false,
        status: SubscriptionContractStatus.PENDING
      });
    if (!subscriptionContractCreated) {
      throw new SubscriptionContractNotFoundException();
    }
    const subscriptionContractModel = this.publisher.mergeObjectContext(
      subscriptionContractCreated
    );
    subscriptionContractModel.createdSubscriptionContract({
      createdBy: data.createdBy
    });
    subscriptionContractModel.commit();

    return subscriptionContractCreated;
  }

  private clearData(
    command: CreateSubscriptionContractCommand
  ): CreateSubscriptionContractCommand {
    return cleanObject({
      app: cleanValue(command?.app),
      startAt: cleanValue(command?.startAt),
      endAt: cleanValue(command?.endAt),
      parent: cleanValue(command?.parent),
      paymentMethod: cleanValue(command?.paymentMethod),
      stripeSubscription: cleanValue(command?.stripeSubscription),
      type: cleanValue(command?.type),
      automaticRenew: cleanValueBoolean(command?.automaticRenew),
      createdBy: cleanValue(command?.createdBy)
    });
  }
}
