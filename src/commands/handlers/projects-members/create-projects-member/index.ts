import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateProjectsMemberCommand } from '@/commands/implements/projects-members/create-projects-member.command';
import {
  ProjectsMemberNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CreateProjectsMemberRepository } from '@/repositories/projects-members/create-projects-member';
import { cleanObject, cleanValue } from '@stokei/nestjs';

type CreateProjectsMemberCommandKeys = keyof CreateProjectsMemberCommand;

@CommandHandler(CreateProjectsMemberCommand)
export class CreateProjectsMemberCommandHandler
  implements ICommandHandler<CreateProjectsMemberCommand>
{
  constructor(
    private readonly createProjectsMemberRepository: CreateProjectsMemberRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateProjectsMemberCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.parent) {
      throw new ParamNotFoundException<CreateProjectsMemberCommandKeys>(
        'parent'
      );
    }

    const projectsMemberCreated =
      await this.createProjectsMemberRepository.execute(data);
    if (!projectsMemberCreated) {
      throw new ProjectsMemberNotFoundException();
    }
    const projectsMemberModel = this.publisher.mergeObjectContext(
      projectsMemberCreated
    );
    projectsMemberModel.createdProjectsMember();
    projectsMemberModel.commit();

    return projectsMemberCreated;
  }

  private clearData(
    command: CreateProjectsMemberCommand
  ): CreateProjectsMemberCommand {
    return cleanObject({
      name: cleanValue(command?.name),
      parent: cleanValue(command?.parent)
    });
  }
}
