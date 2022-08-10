import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import {
  cleanObject,
  cleanValue,
  cleanValueBoolean,
  cleanValueNumber
} from '@stokei/nestjs';

import { CreatePlanCommand } from '@/commands/implements/plans/create-plan.command';
import { PlanStatus } from '@/enums/plan-status.enum';
import {
  DataNotFoundException,
  ParamNotFoundException,
  PlanNotFoundException
} from '@/errors';
import { CreatePlanRepository } from '@/repositories/plans/create-plan';

type CreatePlanCommandKeys = keyof CreatePlanCommand;

@CommandHandler(CreatePlanCommand)
export class CreatePlanCommandHandler
  implements ICommandHandler<CreatePlanCommand>
{
  constructor(
    private readonly createPlanRepository: CreatePlanRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreatePlanCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.type) {
      throw new ParamNotFoundException<CreatePlanCommandKeys>('type');
    }

    const planCreated = await this.createPlanRepository.execute({
      ...data,
      status: PlanStatus.ACTIVE
    });
    if (!planCreated) {
      throw new PlanNotFoundException();
    }
    const planModel = this.publisher.mergeObjectContext(planCreated);
    planModel.createdPlan({
      createdBy: data.createdBy
    });
    planModel.commit();

    return planCreated;
  }

  private clearData(command: CreatePlanCommand): CreatePlanCommand {
    return cleanObject({
      createdBy: cleanValue(command?.createdBy),
      name: cleanValue(command?.name),
      type: cleanValue(command?.type),
      checkoutVisible: cleanValueBoolean(command?.checkoutVisible),
      allowedToSell: cleanValueBoolean(command?.allowedToSell),
      hasCustomDomain: cleanValueBoolean(command?.hasCustomDomain),
      hasCustomSite: cleanValueBoolean(command?.hasCustomSite),
      quantityCourses: cleanValueNumber(command?.quantityCourses),
      quantityInstructorPerCourses: cleanValueNumber(
        command?.quantityInstructorPerCourses
      ),
      quantityClassroomsPerCourses: cleanValueNumber(
        command?.quantityClassroomsPerCourses
      ),
      quantityModulesPerClassrooms: cleanValueNumber(
        command?.quantityModulesPerClassrooms
      ),
      quantityVideosPerModules: cleanValueNumber(
        command?.quantityVideosPerModules
      ),
      applicationFeePercentage: cleanValueNumber(
        command?.applicationFeePercentage
      )
    });
  }
}
