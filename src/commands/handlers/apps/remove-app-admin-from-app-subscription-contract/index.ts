import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { RemoveAppAdminFromAppSubscriptionContractCommand } from '@/commands/implements/apps/remove-app-admin-from-app-subscription-contract.command';
import { PlanType } from '@/enums/plan-type.enum';
import {
  AccountNotFoundException,
  DataNotFoundException,
  ParamNotFoundException,
  PriceNotFoundException
} from '@/errors';
import { SubscriptionContractItemModel } from '@/models/subscription-contract-item.model';
import { FindAccountByIdService } from '@/services/accounts/find-account-by-id';
import { RemoveItemFromAppSubscriptionContractService } from '@/services/apps/remove-item-from-app-subscription-contract';
import { FindPlanPriceByTypeService } from '@/services/plans/find-plan-price-by-type';

type RemoveAppAdminFromAppSubscriptionContractCommandKeys =
  keyof RemoveAppAdminFromAppSubscriptionContractCommand;

@CommandHandler(RemoveAppAdminFromAppSubscriptionContractCommand)
export class RemoveAppAdminFromAppSubscriptionContractCommandHandler
  implements ICommandHandler<RemoveAppAdminFromAppSubscriptionContractCommand>
{
  private readonly logger = new Logger(
    RemoveAppAdminFromAppSubscriptionContractCommandHandler.name
  );
  constructor(
    private readonly findAccountByIdService: FindAccountByIdService,
    private readonly findPlanPriceByTypeService: FindPlanPriceByTypeService,
    private readonly removeItemFromAppSubscriptionContractService: RemoveItemFromAppSubscriptionContractService
  ) {}

  async execute(
    command: RemoveAppAdminFromAppSubscriptionContractCommand
  ): Promise<SubscriptionContractItemModel> {
    const data = this.clearData(command);

    try {
      if (!data) {
        throw new DataNotFoundException();
      }
      if (!data?.app) {
        throw new ParamNotFoundException<RemoveAppAdminFromAppSubscriptionContractCommandKeys>(
          'app'
        );
      }
      if (!data?.admin) {
        throw new ParamNotFoundException<RemoveAppAdminFromAppSubscriptionContractCommandKeys>(
          'admin'
        );
      }
      const admin = await this.findAccountByIdService.execute(data.admin);
      if (!admin) {
        throw new AccountNotFoundException();
      }

      const appAdminPrice = await this.findPlanPriceByTypeService.execute(
        PlanType.ADMIN
      );
      if (!appAdminPrice) {
        throw new PriceNotFoundException();
      }

      const subscriptionContractItem =
        await this.removeItemFromAppSubscriptionContractService.execute({
          quantity: 1,
          app: admin.app,
          price: appAdminPrice.id,
          removedBy: data.removedBy
        });
      return subscriptionContractItem;
    } catch (error) {
      this.logger.error(error?.message);
      return;
    }
  }

  private clearData(
    command: RemoveAppAdminFromAppSubscriptionContractCommand
  ): RemoveAppAdminFromAppSubscriptionContractCommand {
    return cleanObject({
      removedBy: cleanValue(command?.removedBy),
      app: cleanValue(command?.app),
      admin: cleanValue(command?.admin)
    });
  }
}
