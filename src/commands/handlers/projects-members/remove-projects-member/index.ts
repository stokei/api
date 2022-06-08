import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RemoveProjectsMemberCommand } from '@/commands/implements/projects-members/remove-projects-member.command';
import {
  ProjectsMemberNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindProjectsMemberByIdRepository } from '@/repositories/projects-members/find-projects-member-by-id';
import { RemoveProjectsMemberRepository } from '@/repositories/projects-members/remove-projects-member';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

type RemoveProjectsMemberCommandKeys = keyof RemoveProjectsMemberCommand;

@CommandHandler(RemoveProjectsMemberCommand)
export class RemoveProjectsMemberCommandHandler
  implements ICommandHandler<RemoveProjectsMemberCommand>
{
  constructor(
    private readonly findProjectsMemberByIdRepository: FindProjectsMemberByIdRepository,
    private readonly removeProjectsMemberRepository: RemoveProjectsMemberRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemoveProjectsMemberCommand) {
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

    const removed = await this.removeProjectsMemberRepository.execute({
      where: {
        projectsMemberId
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const projectsMemberModel =
      this.publisher.mergeObjectContext(projectsMember);
    projectsMemberModel.removedProjectsMember();
    projectsMemberModel.commit();

    return projectsMember;
  }

  private clearData(
    command: RemoveProjectsMemberCommand
  ): RemoveProjectsMemberCommand {
    return cleanObject({
      where: cleanObject({
        projectsMemberId: cleanValue(command?.where?.projectsMemberId)
      })
    });
  }
}
