import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { RemoveAppAdminFromAppSubscriptionContractCommand } from '@/commands/implements/app-admins/remove-app-admin-from-app-subscription-contract.command';
import { PlanType } from '@/enums/plan-type.enum';
import {
  AppAdminNotFoundException,
  DataNotFoundException,
  ParamNotFoundException,
  PriceNotFoundException
} from '@/errors';
import { SubscriptionContractItemModel } from '@/models/subscription-contract-item.model';
import { FindAppAdminByIdService } from '@/services/app-admins/find-app-admin-by-id';
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
    private readonly findAppAdminByIdService: FindAppAdminByIdService,
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
      if (!data?.appAdmin) {
        throw new ParamNotFoundException<RemoveAppAdminFromAppSubscriptionContractCommandKeys>(
          'appAdmin'
        );
      }

      const appAdmin = await this.findAppAdminByIdService.execute(
        data.appAdmin
      );
      if (!appAdmin) {
        throw new AppAdminNotFoundException();
      }

      const appAdminPrice = await this.findPlanPriceByTypeService.execute(
        PlanType.ADMIN
      );
      if (!appAdminPrice) {
        throw new PriceNotFoundException();
      }

      const subscriptionContractItem =
        await this.removeItemFromAppSubscriptionContractService.execute({
          app: appAdmin.app,
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
      appAdmin: cleanValue(command?.appAdmin)
    });
  }
}
