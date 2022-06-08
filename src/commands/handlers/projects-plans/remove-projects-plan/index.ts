import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RemoveProjectsPlanCommand } from '@/commands/implements/projects-plans/remove-projects-plan.command';
import {
  ProjectsPlanNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindProjectsPlanByIdRepository } from '@/repositories/projects-plans/find-projects-plan-by-id';
import { RemoveProjectsPlanRepository } from '@/repositories/projects-plans/remove-projects-plan';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

type RemoveProjectsPlanCommandKeys = keyof RemoveProjectsPlanCommand;

@CommandHandler(RemoveProjectsPlanCommand)
export class RemoveProjectsPlanCommandHandler
  implements ICommandHandler<RemoveProjectsPlanCommand>
{
  constructor(
    private readonly findProjectsPlanByIdRepository: FindProjectsPlanByIdRepository,
    private readonly removeProjectsPlanRepository: RemoveProjectsPlanRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemoveProjectsPlanCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    const projectsPlanId = splitServiceId(data.where?.projectsPlanId)?.id;
    if (!projectsPlanId) {
      throw new ParamNotFoundException('projectsPlanId');
    }

    const projectsPlan = await this.findProjectsPlanByIdRepository.execute(
      projectsPlanId
    );
    if (!projectsPlan) {
      throw new ProjectsPlanNotFoundException();
    }

    const removed = await this.removeProjectsPlanRepository.execute({
      where: {
        projectsPlanId
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const projectsPlanModel = this.publisher.mergeObjectContext(projectsPlan);
    projectsPlanModel.removedProjectsPlan();
    projectsPlanModel.commit();

    return projectsPlan;
  }

  private clearData(
    command: RemoveProjectsPlanCommand
  ): RemoveProjectsPlanCommand {
    return cleanObject({
      where: cleanObject({
        projectsPlanId: cleanValue(command?.where?.projectsPlanId)
      })
    });
  }
}
