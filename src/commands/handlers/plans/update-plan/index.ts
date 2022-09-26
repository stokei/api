import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { UpdatePlanCommand } from '@/commands/implements/plans/update-plan.command';
import {
  DataNotFoundException,
  ParamNotFoundException,
  PlanNotFoundException
} from '@/errors';
import { PlanModel } from '@/models/plan.model';
import { UpdatePlanRepository } from '@/repositories/plans/update-plan';
import { FindPlanByIdService } from '@/services/plans/find-plan-by-id';

@CommandHandler(UpdatePlanCommand)
export class UpdatePlanCommandHandler
  implements ICommandHandler<UpdatePlanCommand>
{
  constructor(
    private readonly findPlanByIdService: FindPlanByIdService,
    private readonly updatePlanRepository: UpdatePlanRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdatePlanCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    const planId = splitServiceId(data.where?.plan)?.id;
    if (!planId) {
      throw new ParamNotFoundException('planId');
    }
    const plan = await this.findPlanByIdService.execute(data.where?.plan);
    if (!plan) {
      throw new PlanNotFoundException();
    }

    const updated = await this.updatePlanRepository.execute({
      ...data,
      where: {
        ...data.where,
        plan: planId
      }
    });
    if (!updated) {
      throw new DataNotFoundException();
    }

    const planUpdated = new PlanModel({
      ...plan,
      ...data.data
    });
    const planModel = this.publisher.mergeObjectContext(planUpdated);
    planModel.updatedPlan({
      updatedBy: data.data.updatedBy
    });
    planModel.commit();

    return planUpdated;
  }

  private clearData(command: UpdatePlanCommand): UpdatePlanCommand {
    return cleanObject({
      where: cleanObject({
        plan: cleanValue(command?.where?.plan)
      }),
      data: cleanObject({
        price: cleanValue(command?.data?.price),
        product: cleanValue(command?.data?.product),
        updatedBy: cleanValue(command?.data?.updatedBy)
      })
    });
  }
}
