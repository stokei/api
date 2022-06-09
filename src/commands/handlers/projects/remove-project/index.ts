import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { RemoveProjectCommand } from '@/commands/implements/projects/remove-project.command';
import {
  DataNotFoundException,
  ParamNotFoundException,
  ProjectNotFoundException
} from '@/errors';
import { FindProjectByIdRepository } from '@/repositories/projects/find-project-by-id';
import { RemoveProjectRepository } from '@/repositories/projects/remove-project';

type RemoveProjectCommandKeys = keyof RemoveProjectCommand;

@CommandHandler(RemoveProjectCommand)
export class RemoveProjectCommandHandler
  implements ICommandHandler<RemoveProjectCommand>
{
  constructor(
    private readonly findProjectByIdRepository: FindProjectByIdRepository,
    private readonly removeProjectRepository: RemoveProjectRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemoveProjectCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    const projectId = splitServiceId(data.where?.projectId)?.id;
    if (!projectId) {
      throw new ParamNotFoundException('projectId');
    }

    const project = await this.findProjectByIdRepository.execute(projectId);
    if (!project) {
      throw new ProjectNotFoundException();
    }

    const removed = await this.removeProjectRepository.execute({
      where: {
        projectId
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const projectModel = this.publisher.mergeObjectContext(project);
    projectModel.removedProject();
    projectModel.commit();

    return project;
  }

  private clearData(command: RemoveProjectCommand): RemoveProjectCommand {
    return cleanObject({
      where: cleanObject({
        projectId: cleanValue(command?.where?.projectId)
      })
    });
  }
}
