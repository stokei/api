import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { convertToISODateString } from '@stokei/nestjs';

import { BaseCronJob } from '@/common/base-cron-job';
import { SubscriptionContractStatus } from '@/enums/subscription-contract-status.enum';
import { CancelSubscriptionContractService } from '@/services/subscription-contracts/cancel-subscription-contract';
import { FindAllSubscriptionContractsService } from '@/services/subscription-contracts/find-all-subscription-contracts';

@Injectable()
export class CheckSubscriptionContractsCronJob implements BaseCronJob {
  private readonly logger = new Logger(CheckSubscriptionContractsCronJob.name);
  constructor(
    private readonly cancelSubscriptionContractService: CancelSubscriptionContractService,
    private readonly findAllSubscriptionContractsService: FindAllSubscriptionContractsService
  ) {}

  @Cron(CronExpression.EVERY_30_MINUTES)
  async execute(): Promise<void> {
    try {
      const subscriptionContracts =
        await this.findAllSubscriptionContractsService.execute({
          where: {
            AND: {
              endAt: {
                lessEquals: convertToISODateString(Date.now())
              }
            },
            NOT: {
              status: SubscriptionContractStatus.CANCELED
            }
          }
        });
      if (!!subscriptionContracts?.totalCount) {
        await Promise.all(
          subscriptionContracts.items.map(async (subscriptionContract) => {
            try {
              if (
                !subscriptionContract.isCanceled &&
                !!subscriptionContract.isRecurring
              ) {
                await this.cancelSubscriptionContractService.execute({
                  app: subscriptionContract.app,
                  subscriptionContract: subscriptionContract.id,
                  updatedBy: subscriptionContract.createdBy
                });
              }
            } catch (error) {}
          })
        );
      }
    } catch (error) {}
    this.logger.log(`Run ${CheckSubscriptionContractsCronJob.name}.`);
  }
}
