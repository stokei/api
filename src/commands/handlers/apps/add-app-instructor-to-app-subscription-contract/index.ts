import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { AddAppInstructorToAppSubscriptionContractCommand } from '@/commands/implements/apps/add-app-instructor-to-app-subscription-contract.command';
import { AccountRole } from '@/enums/account-role.enum';
import { PlanType } from '@/enums/plan-type.enum';
import {
  AccountNotFoundException,
  DataNotFoundException,
  ParamNotFoundException,
  PriceNotFoundException
} from '@/errors';
import { SubscriptionContractItemModel } from '@/models/subscription-contract-item.model';
import { FindAccountByIdService } from '@/services/accounts/find-account-by-id';
import { FindAllAccountsService } from '@/services/accounts/find-all-accounts';
import { AddItemToAppSubscriptionContractService } from '@/services/apps/add-item-to-app-subscription-contract';
import { FindPlanPriceByTypeService } from '@/services/plans/find-plan-price-by-type';

type AddAppInstructorToAppSubscriptionContractCommandKeys =
  keyof AddAppInstructorToAppSubscriptionContractCommand;

@CommandHandler(AddAppInstructorToAppSubscriptionContractCommand)
export class AddAppInstructorToAppSubscriptionContractCommandHandler
  implements ICommandHandler<AddAppInstructorToAppSubscriptionContractCommand>
{
  private readonly logger = new Logger(
    AddAppInstructorToAppSubscriptionContractCommandHandler.name
  );
  constructor(
    private readonly findAccountByIdService: FindAccountByIdService,
    private readonly findAllAccountsService: FindAllAccountsService,
    private readonly findPlanPriceByTypeService: FindPlanPriceByTypeService,
    private readonly addItemToAppSubscriptionContractService: AddItemToAppSubscriptionContractService
  ) {}

  async execute(
    command: AddAppInstructorToAppSubscriptionContractCommand
  ): Promise<SubscriptionContractItemModel> {
    const data = this.clearData(command);
    try {
      if (!data) {
        throw new DataNotFoundException();
      }
      if (!data?.app) {
        throw new ParamNotFoundException<AddAppInstructorToAppSubscriptionContractCommandKeys>(
          'app'
        );
      }
      if (!data?.instructor) {
        throw new ParamNotFoundException<AddAppInstructorToAppSubscriptionContractCommandKeys>(
          'instructor'
        );
      }
      const instructor = await this.findAccountByIdService.execute(
        data.instructor
      );
      if (!instructor) {
        throw new AccountNotFoundException();
      }

      const appInstructors = await this.findAllAccountsService.execute({
        where: {
          AND: {
            app: {
              equals: data.app
            },
            roles: [AccountRole.INSTRUCTOR]
          }
        },
        page: {
          limit: 1
        }
      });
      if (appInstructors?.totalCount <= 1) {
        return;
      }

      const appInstructorPrice = await this.findPlanPriceByTypeService.execute(
        PlanType.INSTRUCTOR
      );
      if (!appInstructorPrice) {
        throw new PriceNotFoundException();
      }

      const subscriptionContractItem =
        await this.addItemToAppSubscriptionContractService.execute({
          app: instructor.app,
          price: appInstructorPrice.id,
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
    command: AddAppInstructorToAppSubscriptionContractCommand
  ): AddAppInstructorToAppSubscriptionContractCommand {
    return cleanObject({
      createdBy: cleanValue(command?.createdBy),
      app: cleanValue(command?.app),
      instructor: cleanValue(command?.instructor)
    });
  }
}
