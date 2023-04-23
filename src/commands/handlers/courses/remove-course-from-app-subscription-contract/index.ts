import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { RemoveCourseFromAppSubscriptionContractCommand } from '@/commands/implements/courses/remove-course-from-app-subscription-contract.command';
import { PlanType } from '@/enums/plan-type.enum';
import {
  CourseNotFoundException,
  DataNotFoundException,
  ParamNotFoundException,
  PriceNotFoundException
} from '@/errors';
import { SubscriptionContractItemModel } from '@/models/subscription-contract-item.model';
import { RemoveItemFromAppSubscriptionContractService } from '@/services/apps/remove-item-from-app-subscription-contract';
import { FindCourseByIdService } from '@/services/courses/find-course-by-id';
import { FindPlanPriceByTypeService } from '@/services/plans/find-plan-price-by-type';

type RemoveCourseFromAppSubscriptionContractCommandKeys =
  keyof RemoveCourseFromAppSubscriptionContractCommand;

@CommandHandler(RemoveCourseFromAppSubscriptionContractCommand)
export class RemoveCourseFromAppSubscriptionContractCommandHandler
  implements ICommandHandler<RemoveCourseFromAppSubscriptionContractCommand>
{
  private readonly logger = new Logger(
    RemoveCourseFromAppSubscriptionContractCommandHandler.name
  );
  constructor(
    private readonly findCourseByIdService: FindCourseByIdService,
    private readonly findPlanPriceByTypeService: FindPlanPriceByTypeService,
    private readonly removeItemFromAppSubscriptionContractService: RemoveItemFromAppSubscriptionContractService
  ) {}

  async execute(
    command: RemoveCourseFromAppSubscriptionContractCommand
  ): Promise<SubscriptionContractItemModel> {
    const data = this.clearData(command);
    try {
      if (!data) {
        throw new DataNotFoundException();
      }
      if (!data?.course) {
        throw new ParamNotFoundException<RemoveCourseFromAppSubscriptionContractCommandKeys>(
          'course'
        );
      }

      const course = await this.findCourseByIdService.execute(data.course);
      if (!course) {
        throw new CourseNotFoundException();
      }

      const coursePrice = await this.findPlanPriceByTypeService.execute(
        PlanType.COURSE
      );
      if (!coursePrice) {
        throw new PriceNotFoundException();
      }

      const subscriptionContractItem =
        await this.removeItemFromAppSubscriptionContractService.execute({
          quantity: 1,
          app: course.app,
          price: coursePrice.id,
          removedBy: data.removedBy
        });
      return subscriptionContractItem;
    } catch (error) {
      this.logger.error(error?.message);
      return;
    }
  }

  private clearData(
    command: RemoveCourseFromAppSubscriptionContractCommand
  ): RemoveCourseFromAppSubscriptionContractCommand {
    return cleanObject({
      removedBy: cleanValue(command?.removedBy),
      course: cleanValue(command?.course)
    });
  }
}
