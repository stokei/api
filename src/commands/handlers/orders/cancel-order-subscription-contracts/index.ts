import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CancelOrderSubscriptionContractsCommand } from '@/commands/implements/orders/cancel-order-subscription-contracts.command';
import {
  DataNotFoundException,
  OrderNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindOrderByIdService } from '@/services/orders/find-order-by-id';
import { CancelSubscriptionContractService } from '@/services/subscription-contracts/cancel-subscription-contract';
import { FindAllSubscriptionContractsService } from '@/services/subscription-contracts/find-all-subscription-contracts';

type CancelOrderSubscriptionContractsCommandKeys =
  keyof CancelOrderSubscriptionContractsCommand;

@CommandHandler(CancelOrderSubscriptionContractsCommand)
export class CancelOrderSubscriptionContractsCommandHandler
  implements ICommandHandler<CancelOrderSubscriptionContractsCommand>
{
  private readonly logger = new Logger(
    CancelOrderSubscriptionContractsCommandHandler.name
  );
  constructor(
    private readonly cancelSubscriptionContractService: CancelSubscriptionContractService,
    private readonly findOrderByIdService: FindOrderByIdService,
    private readonly findAllSubscriptionContractsService: FindAllSubscriptionContractsService
  ) {}

  async execute(command: CancelOrderSubscriptionContractsCommand) {
    const data = this.clearData(command);
    try {
      if (!data) {
        throw new DataNotFoundException();
      }
      if (!data?.app) {
        throw new ParamNotFoundException<CancelOrderSubscriptionContractsCommandKeys>(
          'app'
        );
      }
      if (!data?.order) {
        throw new ParamNotFoundException<CancelOrderSubscriptionContractsCommandKeys>(
          'order'
        );
      }

      const order = await this.findOrderByIdService.execute(data.order);
      if (!order) {
        throw new OrderNotFoundException();
      }
      const subscriptionContracts =
        await this.findAllSubscriptionContractsService.execute({
          where: {
            AND: {
              order: {
                equals: order.id
              },
              app: {
                equals: data.app
              }
            }
          }
        });
      if (!subscriptionContracts?.totalCount) {
        return;
      }

      await Promise.all(
        subscriptionContracts?.items?.map(async (subscriptionContract) => {
          try {
            const subscriptionContractCanceled =
              await this.cancelSubscriptionContractService.execute({
                app: subscriptionContract.app,
                subscriptionContract: subscriptionContract.id,
                updatedBy: data.createdBy
              });
            return subscriptionContractCanceled;
          } catch (error) {}
        })
      );
      return;
    } catch (error) {
      this.logger.error(`Order(#${data?.order}): ${error?.message}`);
      return;
    }
  }

  private clearData(
    command: CancelOrderSubscriptionContractsCommand
  ): CancelOrderSubscriptionContractsCommand {
    return cleanObject({
      app: cleanValue(command?.app),
      order: cleanValue(command?.order),
      createdBy: cleanValue(command?.createdBy)
    });
  }
}
