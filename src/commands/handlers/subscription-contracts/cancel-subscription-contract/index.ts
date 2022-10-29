import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import {
  cleanObject,
  cleanValue,
  convertToISODateString,
  splitServiceId
} from '@stokei/nestjs';

import { CancelSubscriptionContractCommand } from '@/commands/implements/subscription-contracts/cancel-subscription-contract.command';
import { CancelSubscriptionContractRepositoryDataDTO } from '@/dtos/subscription-contracts/cancel-subscription-contract-repository.dto';
import { SubscriptionContractStatus } from '@/enums/subscription-contract-status.enum';
import {
  DataNotFoundException,
  ParamNotFoundException,
  SubscriptionContractAlreadyCanceledException,
  SubscriptionContractNotFoundException
} from '@/errors';
import { SubscriptionContractModel } from '@/models/subscription-contract.model';
import { CancelSubscriptionContractRepository } from '@/repositories/subscription-contracts/cancel-subscription-contract';
import { FindSubscriptionContractByIdService } from '@/services/subscription-contracts/find-subscription-contract-by-id';

type CancelSubscriptionContractCommandKeys =
  keyof CancelSubscriptionContractCommand;

@CommandHandler(CancelSubscriptionContractCommand)
export class CancelSubscriptionContractCommandHandler
  implements ICommandHandler<CancelSubscriptionContractCommand>
{
  constructor(
    private readonly cancelSubscriptionContractRepository: CancelSubscriptionContractRepository,
    private readonly findSubscriptionContractByIdService: FindSubscriptionContractByIdService,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CancelSubscriptionContractCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.subscriptionContract) {
      throw new ParamNotFoundException<CancelSubscriptionContractCommandKeys>(
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
    if (subscriptionContract.isCanceled) {
      throw new SubscriptionContractAlreadyCanceledException();
    }

    const endAt = convertToISODateString(Date.now());
    const dataCancel: CancelSubscriptionContractRepositoryDataDTO = {
      active: false,
      status: SubscriptionContractStatus.CANCELED,
      endAt,
      updatedBy: data.updatedBy
    };
    const subscriptionContractCanceled =
      await this.cancelSubscriptionContractRepository.execute({
        data: dataCancel,
        where: {
          app: data.app,
          subscriptionContract: splitServiceId(subscriptionContract.id)?.id
        }
      });
    if (!subscriptionContractCanceled) {
      throw new SubscriptionContractNotFoundException();
    }
    const subscriptionContractActive = new SubscriptionContractModel({
      ...subscriptionContract,
      ...dataCancel
    });
    const subscriptionContractModel = this.publisher.mergeObjectContext(
      subscriptionContractActive
    );
    subscriptionContractModel.canceledSubscriptionContract();
    subscriptionContractModel.commit();

    return subscriptionContractCanceled;
  }

  private clearData(
    command: CancelSubscriptionContractCommand
  ): CancelSubscriptionContractCommand {
    return cleanObject({
      subscriptionContract: cleanValue(command?.subscriptionContract),
      app: cleanValue(command?.app),
      updatedBy: cleanValue(command?.updatedBy)
    });
  }
}
