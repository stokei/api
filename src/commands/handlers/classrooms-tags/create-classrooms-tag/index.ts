import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateClassroomsTagCommand } from '@/commands/implements/classrooms-tags/create-classrooms-tag.command';
import {
  ClassroomsTagNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CreateClassroomsTagRepository } from '@/repositories/classrooms-tags/create-classrooms-tag';
import { cleanObject, cleanValue } from '@stokei/nestjs';

type CreateClassroomsTagCommandKeys = keyof CreateClassroomsTagCommand;

@CommandHandler(CreateClassroomsTagCommand)
export class CreateClassroomsTagCommandHandler
  implements ICommandHandler<CreateClassroomsTagCommand>
{
  constructor(
    private readonly createClassroomsTagRepository: CreateClassroomsTagRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateClassroomsTagCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.parent) {
      throw new ParamNotFoundException<CreateClassroomsTagCommandKeys>(
        'parent'
      );
    }

    const classroomsTagCreated =
      await this.createClassroomsTagRepository.execute(data);
    if (!classroomsTagCreated) {
      throw new ClassroomsTagNotFoundException();
    }
    const classroomsTagModel =
      this.publisher.mergeObjectContext(classroomsTagCreated);
    classroomsTagModel.createdClassroomsTag();
    classroomsTagModel.commit();

    return classroomsTagCreated;
  }

  private clearData(
    command: CreateClassroomsTagCommand
  ): CreateClassroomsTagCommand {
    return cleanObject({
      name: cleanValue(command?.name),
      parent: cleanValue(command?.parent)
    });
  }
}
