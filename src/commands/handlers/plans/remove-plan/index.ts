import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RemovePlanCommand } from '@/commands/implements/plans/remove-plan.command';
import {
  PlanNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindPlanByIdRepository } from '@/repositories/plans/find-plan-by-id';
import { RemovePlanRepository } from '@/repositories/plans/remove-plan';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

type RemovePlanCommandKeys = keyof RemovePlanCommand;

@CommandHandler(RemovePlanCommand)
export class RemovePlanCommandHandler
  implements ICommandHandler<RemovePlanCommand>
{
  constructor(
    private readonly findPlanByIdRepository: FindPlanByIdRepository,
    private readonly removePlanRepository: RemovePlanRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemovePlanCommand) {
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

    const removed = await this.removePlanRepository.execute({
      where: {
        planId
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const planModel = this.publisher.mergeObjectContext(plan);
    planModel.removedPlan();
    planModel.commit();

    return plan;
  }

  private clearData(command: RemovePlanCommand): RemovePlanCommand {
    return cleanObject({
      where: cleanObject({
        planId: cleanValue(command?.where?.planId)
      })
    });
  }
}
