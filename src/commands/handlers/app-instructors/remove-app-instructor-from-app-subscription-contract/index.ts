import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { RemoveAppInstructorFromAppSubscriptionContractCommand } from '@/commands/implements/app-instructors/remove-app-instructor-from-app-subscription-contract.command';
import { PlanType } from '@/enums/plan-type.enum';
import {
  AppInstructorNotFoundException,
  DataNotFoundException,
  ParamNotFoundException,
  PriceNotFoundException
} from '@/errors';
import { SubscriptionContractItemModel } from '@/models/subscription-contract-item.model';
import { FindAppInstructorByIdService } from '@/services/app-instructors/find-app-instructor-by-id';
import { RemoveItemFromAppSubscriptionContractService } from '@/services/apps/remove-item-from-app-subscription-contract';
import { FindPlanPriceByTypeService } from '@/services/plans/find-plan-price-by-type';

type RemoveAppInstructorFromAppSubscriptionContractCommandKeys =
  keyof RemoveAppInstructorFromAppSubscriptionContractCommand;

@CommandHandler(RemoveAppInstructorFromAppSubscriptionContractCommand)
export class RemoveAppInstructorFromAppSubscriptionContractCommandHandler
  implements
    ICommandHandler<RemoveAppInstructorFromAppSubscriptionContractCommand>
{
  constructor(
    private readonly findAppInstructorByIdService: FindAppInstructorByIdService,
    private readonly findPlanPriceByTypeService: FindPlanPriceByTypeService,
    private readonly removeItemFromAppSubscriptionContractService: RemoveItemFromAppSubscriptionContractService
  ) {}

  async execute(
    command: RemoveAppInstructorFromAppSubscriptionContractCommand
  ): Promise<SubscriptionContractItemModel> {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.appInstructor) {
      throw new ParamNotFoundException<RemoveAppInstructorFromAppSubscriptionContractCommandKeys>(
        'appInstructor'
      );
    }

    const appInstructor = await this.findAppInstructorByIdService.execute(
      data.appInstructor
    );
    if (!appInstructor) {
      throw new AppInstructorNotFoundException();
    }

    const appInstructorPrice = await this.findPlanPriceByTypeService.execute(
      PlanType.INSTRUCTOR
    );
    if (!appInstructorPrice) {
      throw new PriceNotFoundException();
    }

    const subscriptionContractItem =
      await this.removeItemFromAppSubscriptionContractService.execute({
        app: appInstructor.app,
        price: appInstructorPrice.id,
        removedBy: data.removedBy
      });
    return subscriptionContractItem;
  }

  private clearData(
    command: RemoveAppInstructorFromAppSubscriptionContractCommand
  ): RemoveAppInstructorFromAppSubscriptionContractCommand {
    return cleanObject({
      removedBy: cleanValue(command?.removedBy),
      appInstructor: cleanValue(command?.appInstructor)
    });
  }
}
