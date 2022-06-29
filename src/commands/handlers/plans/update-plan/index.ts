import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { UpdatePlanCommand } from '@/commands/implements/plans/update-plan.command';
import {
  DataNotFoundException,
  ParamNotFoundException,
  PlanNotFoundException
} from '@/errors';
import { FindPlanByIdRepository } from '@/repositories/plans/find-plan-by-id';
import { UpdatePlanRepository } from '@/repositories/plans/update-plan';

type UpdatePlanCommandKeys = keyof UpdatePlanCommand;

@CommandHandler(UpdatePlanCommand)
export class UpdatePlanCommandHandler
  implements ICommandHandler<UpdatePlanCommand>
{
  constructor(
    private readonly findPlanByIdRepository: FindPlanByIdRepository,
    private readonly updatePlanRepository: UpdatePlanRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdatePlanCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    const planId = splitServiceId(data.where?.planId)?.id;
    if (!planId) {
      throw new ParamNotFoundException('planId');
    }

    const plan = await this.findPlanByIdRepository.execute(planId);
    if (!plan) {
      throw new PlanNotFoundException();
    }

    const updated = await this.updatePlanRepository.execute({
      ...data,
      where: {
        ...data.where,
        planId
      }
    });
    if (!updated) {
      throw new DataNotFoundException();
    }

    const planUpdated = await this.findPlanByIdRepository.execute(planId);
    if (!planUpdated) {
      throw new PlanNotFoundException();
    }
    const planModel = this.publisher.mergeObjectContext(planUpdated);
    planModel.updatedPlan();
    planModel.commit();

    return planUpdated;
  }

  private clearData(command: UpdatePlanCommand): UpdatePlanCommand {
    return cleanObject({
      where: cleanObject({
        planId: cleanValue(command?.where?.planId)
      }),
      data: cleanObject({
        name: cleanValue(command?.data?.name),
        updatedBy: cleanValue(command?.data?.updatedBy)
      })
    });
  }
}
