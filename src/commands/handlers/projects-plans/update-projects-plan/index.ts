import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UpdateProjectsPlanCommand } from '@/commands/implements/projects-plans/update-projects-plan.command';
import {
  ProjectsPlanNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindProjectsPlanByIdRepository } from '@/repositories/projects-plans/find-projects-plan-by-id';
import { UpdateProjectsPlanRepository } from '@/repositories/projects-plans/update-projects-plan';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

type UpdateProjectsPlanCommandKeys = keyof UpdateProjectsPlanCommand;

@CommandHandler(UpdateProjectsPlanCommand)
export class UpdateProjectsPlanCommandHandler
  implements ICommandHandler<UpdateProjectsPlanCommand>
{
  constructor(
    private readonly findProjectsPlanByIdRepository: FindProjectsPlanByIdRepository,
    private readonly updateProjectsPlanRepository: UpdateProjectsPlanRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdateProjectsPlanCommand) {
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

    const updated = await this.updateProjectsPlanRepository.execute({
      ...data,
      where: {
        ...data.where,
        projectsPlanId
      }
    });
    if (!updated) {
      throw new DataNotFoundException();
    }

    const projectsPlanUpdated =
      await this.findProjectsPlanByIdRepository.execute(projectsPlanId);
    if (!projectsPlanUpdated) {
      throw new ProjectsPlanNotFoundException();
    }
    const projectsPlanModel =
      this.publisher.mergeObjectContext(projectsPlanUpdated);
    projectsPlanModel.updatedProjectsPlan();
    projectsPlanModel.commit();

    return projectsPlanUpdated;
  }

  private clearData(
    command: UpdateProjectsPlanCommand
  ): UpdateProjectsPlanCommand {
    return cleanObject({
      where: cleanObject({
        projectsPlanId: cleanValue(command?.where?.projectsPlanId)
      }),
      data: cleanObject({
        name: cleanValue(command?.data?.name)
      })
    });
  }
}
