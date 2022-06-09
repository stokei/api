import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreatePlanCommand } from '@/commands/implements/plans/create-plan.command';
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
    if (!data?.parent) {
      throw new ParamNotFoundException<CreatePlanCommandKeys>('parent');
    }

    const planCreated = await this.createPlanRepository.execute(data);
    if (!planCreated) {
      throw new PlanNotFoundException();
    }
    const planModel = this.publisher.mergeObjectContext(planCreated);
    planModel.createdPlan();
    planModel.commit();

    return planCreated;
  }

  private clearData(command: CreatePlanCommand): CreatePlanCommand {
    return cleanObject({
      name: cleanValue(command?.name),
      parent: cleanValue(command?.parent)
    });
  }
}
