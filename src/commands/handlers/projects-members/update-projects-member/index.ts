import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UpdateProjectsMemberCommand } from '@/commands/implements/projects-members/update-projects-member.command';
import {
  ProjectsMemberNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindProjectsMemberByIdRepository } from '@/repositories/projects-members/find-projects-member-by-id';
import { UpdateProjectsMemberRepository } from '@/repositories/projects-members/update-projects-member';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

type UpdateProjectsMemberCommandKeys = keyof UpdateProjectsMemberCommand;

@CommandHandler(UpdateProjectsMemberCommand)
export class UpdateProjectsMemberCommandHandler
  implements ICommandHandler<UpdateProjectsMemberCommand>
{
  constructor(
    private readonly findProjectsMemberByIdRepository: FindProjectsMemberByIdRepository,
    private readonly updateProjectsMemberRepository: UpdateProjectsMemberRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdateProjectsMemberCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    const projectsMemberId = splitServiceId(data.where?.projectsMemberId)?.id;
    if (!projectsMemberId) {
      throw new ParamNotFoundException('projectsMemberId');
    }

    const projectsMember = await this.findProjectsMemberByIdRepository.execute(
      projectsMemberId
    );
    if (!projectsMember) {
      throw new ProjectsMemberNotFoundException();
    }

    const updated = await this.updateProjectsMemberRepository.execute({
      ...data,
      where: {
        ...data.where,
        projectsMemberId
      }
    });
    if (!updated) {
      throw new DataNotFoundException();
    }

    const projectsMemberUpdated =
      await this.findProjectsMemberByIdRepository.execute(projectsMemberId);
    if (!projectsMemberUpdated) {
      throw new ProjectsMemberNotFoundException();
    }
    const projectsMemberModel = this.publisher.mergeObjectContext(
      projectsMemberUpdated
    );
    projectsMemberModel.updatedProjectsMember();
    projectsMemberModel.commit();

    return projectsMemberUpdated;
  }

  private clearData(
    command: UpdateProjectsMemberCommand
  ): UpdateProjectsMemberCommand {
    return cleanObject({
      where: cleanObject({
        projectsMemberId: cleanValue(command?.where?.projectsMemberId)
      }),
      data: cleanObject({
        name: cleanValue(command?.data?.name)
      })
    });
  }
}
