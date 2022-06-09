import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreateProjectCommand } from '@/commands/implements/projects/create-project.command';
import {
  DataNotFoundException,
  ParamNotFoundException,
  ProjectNotFoundException
} from '@/errors';
import { CreateProjectRepository } from '@/repositories/projects/create-project';

type CreateProjectCommandKeys = keyof CreateProjectCommand;

@CommandHandler(CreateProjectCommand)
export class CreateProjectCommandHandler
  implements ICommandHandler<CreateProjectCommand>
{
  constructor(
    private readonly createProjectRepository: CreateProjectRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateProjectCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.parent) {
      throw new ParamNotFoundException<CreateProjectCommandKeys>('parent');
    }

    const projectCreated = await this.createProjectRepository.execute(data);
    if (!projectCreated) {
      throw new ProjectNotFoundException();
    }
    const projectModel = this.publisher.mergeObjectContext(projectCreated);
    projectModel.createdProject();
    projectModel.commit();

    return projectCreated;
  }

  private clearData(command: CreateProjectCommand): CreateProjectCommand {
    return cleanObject({
      name: cleanValue(command?.name),
      parent: cleanValue(command?.parent)
    });
  }
}
