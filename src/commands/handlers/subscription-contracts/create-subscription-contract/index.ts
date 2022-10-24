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
        app: data.app,
        automaticRenew: data.automaticRenew,
        createdBy: data.createdBy,
        parent: data.parent,
        product: data.product,
        invoiceProduct: data.invoiceProduct,
        price: data.price,
        recurringIntervalCount: data.recurringIntervalCount,
        recurringIntervalType: data.recurringIntervalType,
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
      parent: cleanValue(command?.parent),
      invoiceProduct: cleanValue(command?.invoiceProduct),
      price: cleanValue(command?.price),
      recurringIntervalType: cleanValue(command?.recurringIntervalType),
      recurringIntervalCount: cleanValueNumber(command?.recurringIntervalCount),
      product: cleanValue(command?.product),
      stripeSubscription: cleanValue(command?.stripeSubscription),
      type: cleanValue(command?.type),
      automaticRenew: cleanValueBoolean(command?.automaticRenew),
      app: cleanValue(command?.app),
      createdBy: cleanValue(command?.createdBy)
    });
  }
}
