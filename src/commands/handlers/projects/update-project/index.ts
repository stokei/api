import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UpdateProjectCommand } from '@/commands/implements/projects/update-project.command';
import {
  ProjectNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindProjectByIdRepository } from '@/repositories/projects/find-project-by-id';
import { UpdateProjectRepository } from '@/repositories/projects/update-project';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

type UpdateProjectCommandKeys = keyof UpdateProjectCommand;

@CommandHandler(UpdateProjectCommand)
export class UpdateProjectCommandHandler
  implements ICommandHandler<UpdateProjectCommand>
{
  constructor(
    private readonly findProjectByIdRepository: FindProjectByIdRepository,
    private readonly updateProjectRepository: UpdateProjectRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdateProjectCommand) {
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

    const updated = await this.updateProjectRepository.execute({
      ...data,
      where: {
        ...data.where,
        projectId
      }
    });
    if (!updated) {
      throw new DataNotFoundException();
    }

    const projectUpdated = await this.findProjectByIdRepository.execute(
      projectId
    );
    if (!projectUpdated) {
      throw new ProjectNotFoundException();
    }
    const projectModel = this.publisher.mergeObjectContext(projectUpdated);
    projectModel.updatedProject();
    projectModel.commit();

    return projectUpdated;
  }

  private clearData(command: UpdateProjectCommand): UpdateProjectCommand {
    return cleanObject({
      where: cleanObject({
        projectId: cleanValue(command?.where?.projectId)
      }),
      data: cleanObject({
        name: cleanValue(command?.data?.name)
      })
    });
  }
}
