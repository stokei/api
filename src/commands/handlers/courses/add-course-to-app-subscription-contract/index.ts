import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { AddCourseToAppSubscriptionContractCommand } from '@/commands/implements/courses/add-course-to-app-subscription-contract.command';
import { PlanType } from '@/enums/plan-type.enum';
import {
  CourseNotFoundException,
  DataNotFoundException,
  ParamNotFoundException,
  PriceNotFoundException
} from '@/errors';
import { SubscriptionContractItemModel } from '@/models/subscription-contract-item.model';
import { AddItemToAppSubscriptionContractService } from '@/services/apps/add-item-to-app-subscription-contract';
import { FindCourseByIdService } from '@/services/courses/find-course-by-id';
import { FindPlanPriceByTypeService } from '@/services/plans/find-plan-price-by-type';

type AddCourseToAppSubscriptionContractCommandKeys =
  keyof AddCourseToAppSubscriptionContractCommand;

@CommandHandler(AddCourseToAppSubscriptionContractCommand)
export class AddCourseToAppSubscriptionContractCommandHandler
  implements ICommandHandler<AddCourseToAppSubscriptionContractCommand>
{
  constructor(
    private readonly findCourseByIdService: FindCourseByIdService,
    private readonly findPlanPriceByTypeService: FindPlanPriceByTypeService,
    private readonly addItemToAppSubscriptionContractService: AddItemToAppSubscriptionContractService
  ) {}

  async execute(
    command: AddCourseToAppSubscriptionContractCommand
  ): Promise<SubscriptionContractItemModel> {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.course) {
      throw new ParamNotFoundException<AddCourseToAppSubscriptionContractCommandKeys>(
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
      await this.addItemToAppSubscriptionContractService.execute({
        app: course.app,
        price: coursePrice.id,
        createdBy: data.createdBy,
        quantity: 1
      });
    return subscriptionContractItem;
  }

  private clearData(
    command: AddCourseToAppSubscriptionContractCommand
  ): AddCourseToAppSubscriptionContractCommand {
    return cleanObject({
      createdBy: cleanValue(command?.createdBy),
      course: cleanValue(command?.course)
    });
  }
}
