import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { AddAppAdminToAppSubscriptionContractCommand } from '@/commands/implements/apps/add-app-admin-to-app-subscription-contract.command';
import { roleName } from '@/constants/role-name';
import { PlanType } from '@/enums/plan-type.enum';
import {
  AccountNotFoundException,
  DataNotFoundException,
  ParamNotFoundException,
  PriceNotFoundException
} from '@/errors';
import { SubscriptionContractItemModel } from '@/models/subscription-contract-item.model';
import { FindAccountByIdService } from '@/services/accounts/find-account-by-id';
import { AddItemToAppSubscriptionContractService } from '@/services/apps/add-item-to-app-subscription-contract';
import { FindPlanPriceByTypeService } from '@/services/plans/find-plan-price-by-type';
import { FindAllRolesService } from '@/services/roles/find-all-roles';

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
    private readonly findAccountByIdService: FindAccountByIdService,
    private readonly findAllRolesService: FindAllRolesService,
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
      if (!data?.app) {
        throw new ParamNotFoundException<AddAppAdminToAppSubscriptionContractCommandKeys>(
          'app'
        );
      }
      if (!data?.admin) {
        throw new ParamNotFoundException<AddAppAdminToAppSubscriptionContractCommandKeys>(
          'admin'
        );
      }
      const admin = await this.findAccountByIdService.execute(data.admin);
      if (!admin) {
        throw new AccountNotFoundException();
      }

      const appAdmins = await this.findAllRolesService.execute({
        where: {
          AND: {
            app: {
              equals: data?.app
            },
            name: {
              equals: roleName.ADMIN
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
          app: admin.app,
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
      app: cleanValue(command?.app),
      admin: cleanValue(command?.admin)
    });
  }
}
