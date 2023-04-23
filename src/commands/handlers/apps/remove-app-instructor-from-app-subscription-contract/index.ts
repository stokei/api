import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { RemoveAppInstructorFromAppSubscriptionContractCommand } from '@/commands/implements/apps/remove-app-instructor-from-app-subscription-contract.command';
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

type RemoveAppInstructorFromAppSubscriptionContractCommandKeys =
  keyof RemoveAppInstructorFromAppSubscriptionContractCommand;

@CommandHandler(RemoveAppInstructorFromAppSubscriptionContractCommand)
export class RemoveAppInstructorFromAppSubscriptionContractCommandHandler
  implements
    ICommandHandler<RemoveAppInstructorFromAppSubscriptionContractCommand>
{
  private readonly logger = new Logger(
    RemoveAppInstructorFromAppSubscriptionContractCommandHandler.name
  );
  constructor(
    private readonly findAccountByIdService: FindAccountByIdService,
    private readonly findPlanPriceByTypeService: FindPlanPriceByTypeService,
    private readonly removeItemFromAppSubscriptionContractService: RemoveItemFromAppSubscriptionContractService
  ) {}

  async execute(
    command: RemoveAppInstructorFromAppSubscriptionContractCommand
  ): Promise<SubscriptionContractItemModel> {
    const data = this.clearData(command);

    try {
      if (!data) {
        throw new DataNotFoundException();
      }
      if (!data?.app) {
        throw new ParamNotFoundException<RemoveAppInstructorFromAppSubscriptionContractCommandKeys>(
          'app'
        );
      }
      if (!data?.instructor) {
        throw new ParamNotFoundException<RemoveAppInstructorFromAppSubscriptionContractCommandKeys>(
          'instructor'
        );
      }
      const instructor = await this.findAccountByIdService.execute(
        data.instructor
      );
      if (!instructor) {
        throw new AccountNotFoundException();
      }

      const appInstructorPrice = await this.findPlanPriceByTypeService.execute(
        PlanType.INSTRUCTOR
      );
      if (!appInstructorPrice) {
        throw new PriceNotFoundException();
      }

      const subscriptionContractItem =
        await this.removeItemFromAppSubscriptionContractService.execute({
          quantity: 1,
          app: instructor.app,
          price: appInstructorPrice.id,
          removedBy: data.removedBy
        });
      return subscriptionContractItem;
    } catch (error) {
      this.logger.error(error?.message);
      return;
    }
  }

  private clearData(
    command: RemoveAppInstructorFromAppSubscriptionContractCommand
  ): RemoveAppInstructorFromAppSubscriptionContractCommand {
    return cleanObject({
      removedBy: cleanValue(command?.removedBy),
      app: cleanValue(command?.app),
      instructor: cleanValue(command?.instructor)
    });
  }
}
