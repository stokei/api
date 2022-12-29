import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { AddAppInstructorToAppSubscriptionContractCommand } from '@/commands/implements/app-instructors/add-app-instructor-to-app-subscription-contract.command';
import { PlanType } from '@/enums/plan-type.enum';
import {
  AppInstructorNotFoundException,
  DataNotFoundException,
  ParamNotFoundException,
  PriceNotFoundException
} from '@/errors';
import { SubscriptionContractItemModel } from '@/models/subscription-contract-item.model';
import { FindAllAppInstructorsService } from '@/services/app-instructors/find-all-app-instructors';
import { FindAppInstructorByIdService } from '@/services/app-instructors/find-app-instructor-by-id';
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
    private readonly findAppInstructorByIdService: FindAppInstructorByIdService,
    private readonly findPlanPriceByTypeService: FindPlanPriceByTypeService,
    private readonly findAllAppInstructorsService: FindAllAppInstructorsService,
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
      if (!data?.appInstructor) {
        throw new ParamNotFoundException<AddAppInstructorToAppSubscriptionContractCommandKeys>(
          'appInstructor'
        );
      }

      const appInstructor = await this.findAppInstructorByIdService.execute(
        data.appInstructor
      );
      if (!appInstructor) {
        throw new AppInstructorNotFoundException();
      }

      const appInstructors = await this.findAllAppInstructorsService.execute({
        where: {
          AND: {
            app: {
              equals: appInstructor.app
            }
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
          app: appInstructor.app,
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
      appInstructor: cleanValue(command?.appInstructor)
    });
  }
}
