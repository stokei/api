import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateProjectsPlanCommand } from '@/commands/implements/projects-plans/create-projects-plan.command';
import {
  ProjectsPlanNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CreateProjectsPlanRepository } from '@/repositories/projects-plans/create-projects-plan';
import { cleanObject, cleanValue } from '@stokei/nestjs';

type CreateProjectsPlanCommandKeys = keyof CreateProjectsPlanCommand;

@CommandHandler(CreateProjectsPlanCommand)
export class CreateProjectsPlanCommandHandler
  implements ICommandHandler<CreateProjectsPlanCommand>
{
  constructor(
    private readonly createProjectsPlanRepository: CreateProjectsPlanRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateProjectsPlanCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.parent) {
      throw new ParamNotFoundException<CreateProjectsPlanCommandKeys>('parent');
    }

    const projectsPlanCreated = await this.createProjectsPlanRepository.execute(
      data
    );
    if (!projectsPlanCreated) {
      throw new ProjectsPlanNotFoundException();
    }
    const projectsPlanModel =
      this.publisher.mergeObjectContext(projectsPlanCreated);
    projectsPlanModel.createdProjectsPlan();
    projectsPlanModel.commit();

    return projectsPlanCreated;
  }

  private clearData(
    command: CreateProjectsPlanCommand
  ): CreateProjectsPlanCommand {
    return cleanObject({
      name: cleanValue(command?.name),
      parent: cleanValue(command?.parent)
    });
  }
}
