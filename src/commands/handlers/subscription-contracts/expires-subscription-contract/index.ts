import { Logger } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import {
  cleanObject,
  cleanValue,
  convertToISODateString,
  splitServiceId
} from '@stokei/nestjs';

import { ExpiresSubscriptionContractCommand } from '@/commands/implements/subscription-contracts/expires-subscription-contract.command';
import { ExpiresSubscriptionContractRepositoryDataDTO } from '@/dtos/subscription-contracts/expires-subscription-contract-repository.dto';
import { SubscriptionContractStatus } from '@/enums/subscription-contract-status.enum';
import {
  AppNotFoundException,
  DataNotFoundException,
  ParamNotFoundException,
  SubscriptionContractAlreadyExpiredException,
  SubscriptionContractNotFoundException
} from '@/errors';
import { SubscriptionContractModel } from '@/models/subscription-contract.model';
import { ExpiresSubscriptionContractRepository } from '@/repositories/subscription-contracts/expires-subscription-contract';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';
import { FindSubscriptionContractByIdService } from '@/services/subscription-contracts/find-subscription-contract-by-id';

type ExpiresSubscriptionContractCommandKeys =
  keyof ExpiresSubscriptionContractCommand;

@CommandHandler(ExpiresSubscriptionContractCommand)
export class ExpiresSubscriptionContractCommandHandler
  implements ICommandHandler<ExpiresSubscriptionContractCommand>
{
  private readonly logger = new Logger(
    ExpiresSubscriptionContractCommandHandler.name
  );
  constructor(
    private readonly expiresSubscriptionContractRepository: ExpiresSubscriptionContractRepository,
    private readonly findSubscriptionContractByIdService: FindSubscriptionContractByIdService,
    private readonly findAppByIdService: FindAppByIdService,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: ExpiresSubscriptionContractCommand) {
    const data = this.clearData(command);
    try {
      if (!data) {
        throw new DataNotFoundException();
      }
      if (!data?.subscriptionContract) {
        throw new ParamNotFoundException<ExpiresSubscriptionContractCommandKeys>(
          'subscriptionContract'
        );
      }
      const app = await this.findAppByIdService.execute(data.app);
      if (!app) {
        throw new AppNotFoundException();
      }

      const subscriptionContract =
        await this.findSubscriptionContractByIdService.execute(
          data.subscriptionContract
        );
      if (!subscriptionContract) {
        throw new SubscriptionContractNotFoundException();
      }
      if (subscriptionContract.isExpired) {
        throw new SubscriptionContractAlreadyExpiredException();
      }

      const startAt =
        subscriptionContract.startAt || subscriptionContract.createdAt;
      const endAt = convertToISODateString(Date.now());
      const dataExpires: ExpiresSubscriptionContractRepositoryDataDTO = {
        active: false,
        status: SubscriptionContractStatus.EXPIRED,
        startAt,
        endAt,
        updatedBy: data.updatedBy
      };
      const subscriptionContractExpiresed =
        await this.expiresSubscriptionContractRepository.execute({
          data: dataExpires,
          where: {
            app: data.app,
            subscriptionContract: splitServiceId(subscriptionContract.id)?.id
          }
        });
      if (!subscriptionContractExpiresed) {
        throw new SubscriptionContractNotFoundException();
      }
      const subscriptionContractActive = new SubscriptionContractModel({
        ...subscriptionContract,
        ...dataExpires
      });
      const subscriptionContractModel = this.publisher.mergeObjectContext(
        subscriptionContractActive
      );
      subscriptionContractModel.expiredSubscriptionContract();
      subscriptionContractModel.commit();

      return subscriptionContractActive;
    } catch (error) {
      this.logger.error(
        `SubscriptionContract(#${data?.subscriptionContract}): ${error?.message}`
      );
      return;
    }
  }

  private clearData(
    command: ExpiresSubscriptionContractCommand
  ): ExpiresSubscriptionContractCommand {
    return cleanObject({
      subscriptionContract: cleanValue(command?.subscriptionContract),
      app: cleanValue(command?.app),
      updatedBy: cleanValue(command?.updatedBy)
    });
  }
}
