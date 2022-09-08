import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import {
  addDays,
  addMonths,
  addWeeks,
  addYears,
  cleanObject,
  cleanValue,
  cleanValueBoolean,
  cleanValueNumber,
  convertToISODateString
} from '@stokei/nestjs';

import { CreateSubscriptionContractCommand } from '@/commands/implements/subscription-contracts/create-subscription-contract.command';
import { PriceType } from '@/enums/price-type.enum';
import { RecurringType } from '@/enums/recurring-type.enum';
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

    const isRecurringType = PriceType.RECURRING === data.type;
    let startAt = null;
    let endAt = null;
    if (isRecurringType) {
      startAt = this.getStartAt();
      endAt = this.getEndAt({
        startAt,
        recurringIntervalCount: data.recurringIntervalCount,
        recurringIntervalType: data.recurringIntervalType
      });
    }
    const subscriptionContractCreated =
      await this.createSubscriptionContractRepository.execute({
        app: data.app,
        automaticRenew: data.automaticRenew,
        createdBy: data.createdBy,
        currency: data.currency,
        parent: data.parent,
        product: data.product,
        stripeCheckoutSession: data.stripeCheckoutSession,
        stripeSubscription: data.stripeSubscription,
        subtotalAmount: data.subtotalAmount,
        totalAmount: data.totalAmount,
        type: data.type,
        startAt,
        endAt,
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
      parent: cleanValue(command?.parent),
      recurringIntervalType: cleanValue(command?.recurringIntervalType),
      recurringIntervalCount: cleanValueNumber(command?.recurringIntervalCount),
      product: cleanValue(command?.product),
      currency: cleanValue(command?.currency),
      totalAmount: cleanValueNumber(command?.totalAmount),
      subtotalAmount: cleanValueNumber(command?.subtotalAmount),
      stripeCheckoutSession: cleanValue(command?.stripeCheckoutSession),
      stripeSubscription: cleanValue(command?.stripeSubscription),
      type: cleanValue(command?.type),
      automaticRenew: cleanValueBoolean(command?.automaticRenew),
      app: cleanValue(command?.app),
      createdBy: cleanValue(command?.createdBy)
    });
  }

  private getStartAt() {
    return convertToISODateString(Date.now());
  }

  private getEndAt({
    startAt,
    recurringIntervalCount,
    recurringIntervalType
  }: {
    startAt: string;
    recurringIntervalCount: number;
    recurringIntervalType: RecurringType;
  }) {
    const createEndAtFunctions = {
      [RecurringType.DAY]: addDays,
      [RecurringType.WEEK]: addWeeks,
      [RecurringType.MONTH]: addMonths,
      [RecurringType.YEAR]: addYears
    };
    const createEndAt = createEndAtFunctions[recurringIntervalType];
    if (!createEndAt) {
      return null;
    }
    return convertToISODateString(createEndAt(recurringIntervalCount, startAt));
  }
}
