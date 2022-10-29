import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import {
  addDays,
  addMonths,
  addWeeks,
  addYears,
  cleanObject,
  cleanValue,
  convertToISODateString,
  splitServiceId
} from '@stokei/nestjs';

import { ActivateSubscriptionContractCommand } from '@/commands/implements/subscription-contracts/activate-subscription-contract.command';
import { ActivateSubscriptionContractRepositoryDataDTO } from '@/dtos/subscription-contracts/activate-subscription-contract-repository.dto';
import { IntervalType } from '@/enums/interval-type.enum';
import { SubscriptionContractStatus } from '@/enums/subscription-contract-status.enum';
import {
  DataNotFoundException,
  ParamNotFoundException,
  SubscriptionContractNotFoundException
} from '@/errors';
import { SubscriptionContractModel } from '@/models/subscription-contract.model';
import { ActivateSubscriptionContractRepository } from '@/repositories/subscription-contracts/activate-subscription-contract';
import { FindSubscriptionContractByIdService } from '@/services/subscription-contracts/find-subscription-contract-by-id';

type ActivateSubscriptionContractCommandKeys =
  keyof ActivateSubscriptionContractCommand;

@CommandHandler(ActivateSubscriptionContractCommand)
export class ActivateSubscriptionContractCommandHandler
  implements ICommandHandler<ActivateSubscriptionContractCommand>
{
  constructor(
    private readonly activateSubscriptionContractRepository: ActivateSubscriptionContractRepository,
    private readonly findSubscriptionContractByIdService: FindSubscriptionContractByIdService,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: ActivateSubscriptionContractCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.subscriptionContract) {
      throw new ParamNotFoundException<ActivateSubscriptionContractCommandKeys>(
        'subscriptionContract'
      );
    }

    const subscriptionContract =
      await this.findSubscriptionContractByIdService.execute(
        data.subscriptionContract
      );
    if (!subscriptionContract) {
      throw new SubscriptionContractNotFoundException();
    }

    const dataActivate: ActivateSubscriptionContractRepositoryDataDTO = {
      paymentMethod: data.paymentMethod,
      active: true,
      status: SubscriptionContractStatus.ACTIVE,
      startAt: data.startAt,
      endAt: data.endAt,
      updatedBy: data.updatedBy
    };

    const subscriptionContractActivated =
      await this.activateSubscriptionContractRepository.execute({
        data: dataActivate,
        where: {
          app: data.app,
          subscriptionContract: splitServiceId(subscriptionContract.id)?.id
        }
      });
    if (!subscriptionContractActivated) {
      throw new SubscriptionContractNotFoundException();
    }
    const subscriptionContractActive = new SubscriptionContractModel({
      ...subscriptionContract,
      ...dataActivate
    });
    const subscriptionContractModel = this.publisher.mergeObjectContext(
      subscriptionContractActive
    );
    subscriptionContractModel.activatedSubscriptionContract();
    subscriptionContractModel.commit();

    return subscriptionContractActivated;
  }

  private clearData(
    command: ActivateSubscriptionContractCommand
  ): ActivateSubscriptionContractCommand {
    return cleanObject({
      subscriptionContract: cleanValue(command?.subscriptionContract),
      paymentMethod: cleanValue(command?.paymentMethod),
      app: cleanValue(command?.app),
      startAt: cleanValue(command?.startAt),
      endAt: cleanValue(command?.endAt),
      updatedBy: cleanValue(command?.updatedBy)
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
    recurringIntervalType: IntervalType;
  }) {
    const createEndAtFunctions = {
      [IntervalType.DAY]: addDays,
      [IntervalType.WEEK]: addWeeks,
      [IntervalType.MONTH]: addMonths,
      [IntervalType.YEAR]: addYears
    };
    const createEndAt = createEndAtFunctions[recurringIntervalType];
    if (!createEndAt) {
      return null;
    }
    return convertToISODateString(createEndAt(recurringIntervalCount, startAt));
  }
}
