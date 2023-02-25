import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { AddAppAdminToAppSubscriptionContractCommand } from '@/commands/implements/app-admins/add-app-admin-to-app-subscription-contract.command';
import { PlanType } from '@/enums/plan-type.enum';
import {
  AppAdminNotFoundException,
  DataNotFoundException,
  ParamNotFoundException,
  PriceNotFoundException
} from '@/errors';
import { SubscriptionContractItemModel } from '@/models/subscription-contract-item.model';
import { FindAllAppAdminsService } from '@/services/app-admins/find-all-app-admins';
import { FindAppAdminByIdService } from '@/services/app-admins/find-app-admin-by-id';
import { AddItemToAppSubscriptionContractService } from '@/services/apps/add-item-to-app-subscription-contract';
import { FindPlanPriceByTypeService } from '@/services/plans/find-plan-price-by-type';

type AddAppAdminToAppSubscriptionContractCommandKeys =
  keyof AddAppAdminToAppSubscriptionContractCommand;

@CommandHandler(AddAppAdminToAppSubscriptionContractCommand)
export class AddAppAdminToAppSubscriptionContractCommandHandler
  implements ICommandHandler<AddAppAdminToAppSubscriptionContractCommand>
{
  private readonly logger = new Logger(
    AddAppAdminToAppSubscriptionContractCommandHandler.name
  );
  constructor(
    private readonly findAppAdminByIdService: FindAppAdminByIdService,
    private readonly findAllAppAdminsService: FindAllAppAdminsService,
    private readonly findPlanPriceByTypeService: FindPlanPriceByTypeService,
    private readonly addItemToAppSubscriptionContractService: AddItemToAppSubscriptionContractService
  ) {}

  async execute(
    command: AddAppAdminToAppSubscriptionContractCommand
  ): Promise<SubscriptionContractItemModel> {
    const data = this.clearData(command);
    try {
      if (!data) {
        throw new DataNotFoundException();
      }
      if (!data?.appAdmin) {
        throw new ParamNotFoundException<AddAppAdminToAppSubscriptionContractCommandKeys>(
          'appAdmin'
        );
      }

      const appAdmin = await this.findAppAdminByIdService.execute(
        data.appAdmin
      );
      if (!appAdmin) {
        throw new AppAdminNotFoundException();
      }

      const appAdmins = await this.findAllAppAdminsService.execute({
        where: {
          AND: {
            app: {
              equals: appAdmin.app
            }
          }
        },
        page: {
          limit: 1
        }
      });
      if (appAdmins?.totalCount <= 1) {
        return;
      }

      const appAdminPrice = await this.findPlanPriceByTypeService.execute(
        PlanType.ADMIN
      );
      if (!appAdminPrice) {
        throw new PriceNotFoundException();
      }

      const subscriptionContractItem =
        await this.addItemToAppSubscriptionContractService.execute({
          app: appAdmin.app,
          price: appAdminPrice.id,
          createdBy: data.createdBy,
          quantity: 1
        });
      return subscriptionContractItem;
    } catch (error) {
      this.logger.error(error?.message);
      return;
    }
  }

  private clearData(
    command: AddAppAdminToAppSubscriptionContractCommand
  ): AddAppAdminToAppSubscriptionContractCommand {
    return cleanObject({
      createdBy: cleanValue(command?.createdBy),
      appAdmin: cleanValue(command?.appAdmin)
    });
  }
}
