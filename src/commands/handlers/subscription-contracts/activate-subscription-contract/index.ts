import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import {
  cleanObject,
  cleanValue,
  convertToISODateString,
  splitServiceId
} from '@stokei/nestjs';

import { ActivateSubscriptionContractCommand } from '@/commands/implements/subscription-contracts/activate-subscription-contract.command';
import { ActivateSubscriptionContractRepositoryDataDTO } from '@/dtos/subscription-contracts/activate-subscription-contract-repository.dto';
import { SubscriptionContractStatus } from '@/enums/subscription-contract-status.enum';
import {
  DataNotFoundException,
  ParamNotFoundException,
  RecurringNotFoundException,
  SubscriptionContractNotFoundException
} from '@/errors';
import { SubscriptionContractModel } from '@/models/subscription-contract.model';
import { ActivateSubscriptionContractRepository } from '@/repositories/subscription-contracts/activate-subscription-contract';
import { FindRecurringByIdService } from '@/services/recurrings/find-recurring-by-id';
import { FindAllSubscriptionContractItemsService } from '@/services/subscription-contract-items/find-all-subscription-contract-items';
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
    private readonly findRecurringByIdService: FindRecurringByIdService,
    private readonly findAllSubscriptionContractItemsService: FindAllSubscriptionContractItemsService,
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

    const startAt = convertToISODateString(data.startAt || Date.now());
    let endAt = data.endAt;
    if (!data.endAt && subscriptionContract.isRecurring) {
      const subscriptionContractItems =
        await this.findAllSubscriptionContractItemsService.execute({
          where: {
            AND: {
              parent: {
                equals: subscriptionContract?.id
              }
            }
          },
          page: {
            limit: 1
          }
        });
      const subscriptionContractItem = subscriptionContractItems?.items?.[0];

      const recurring = await this.findRecurringByIdService.execute(
        subscriptionContractItem.recurring
      );
      if (!recurring) {
        throw new RecurringNotFoundException();
      }

      endAt = convertToISODateString(
        SubscriptionContractModel.generateEndDate(startAt, recurring)
      );
    }

    const dataActivate: ActivateSubscriptionContractRepositoryDataDTO = {
      paymentMethod: data.paymentMethod,
      active: true,
      status: SubscriptionContractStatus.ACTIVE,
      startAt,
      endAt,
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

    return subscriptionContractActive;
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
}
