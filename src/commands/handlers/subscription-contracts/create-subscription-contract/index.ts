import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import {
  cleanObject,
  cleanValue,
  cleanValueBoolean,
  cleanValueNumber
} from '@stokei/nestjs';

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

    const subscriptionContractCreated =
      await this.createSubscriptionContractRepository.execute({
        ...data,
        status: SubscriptionContractStatus.ACTIVE
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
      createdBy: cleanValue(command?.createdBy),
      app: cleanValue(command?.app),
      product: cleanValue(command?.product),
      totalAmount: cleanValueNumber(command?.totalAmount),
      subtotalAmount: cleanValueNumber(command?.subtotalAmount),
      stripeCheckoutSession: cleanValue(command?.stripeCheckoutSession),
      stripeSubscription: cleanValue(command?.stripeSubscription),
      automaticRenew: cleanValueBoolean(command?.automaticRenew),
      startAt: cleanValue(command?.startAt),
      endAt: cleanValue(command?.endAt),
      parent: cleanValue(command?.parent)
    });
  }
}
