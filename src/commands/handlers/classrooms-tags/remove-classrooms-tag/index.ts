import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { RemoveClassroomsTagCommand } from '@/commands/implements/classrooms-tags/remove-classrooms-tag.command';
import {
  ClassroomsTagNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindClassroomsTagByIdRepository } from '@/repositories/classrooms-tags/find-classrooms-tag-by-id';
import { RemoveClassroomsTagRepository } from '@/repositories/classrooms-tags/remove-classrooms-tag';

type RemoveClassroomsTagCommandKeys = keyof RemoveClassroomsTagCommand;

@CommandHandler(RemoveClassroomsTagCommand)
export class RemoveClassroomsTagCommandHandler
  implements ICommandHandler<RemoveClassroomsTagCommand>
{
  constructor(
    private readonly findClassroomsTagByIdRepository: FindClassroomsTagByIdRepository,
    private readonly removeClassroomsTagRepository: RemoveClassroomsTagRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemoveClassroomsTagCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    const classroomsTagId = splitServiceId(data.where?.classroomsTagId)?.id;
    if (!classroomsTagId) {
      throw new ParamNotFoundException('classroomsTagId');
    }

    const classroomsTag = await this.findClassroomsTagByIdRepository.execute(
      classroomsTagId
    );
    if (!classroomsTag) {
      throw new ClassroomsTagNotFoundException();
    }

    const removed = await this.removeClassroomsTagRepository.execute({
      where: {
        classroomsTagId
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const classroomsTagModel = this.publisher.mergeObjectContext(classroomsTag);
    classroomsTagModel.removedClassroomsTag();
    classroomsTagModel.commit();

    return classroomsTag;
  }

  private clearData(
    command: RemoveClassroomsTagCommand
  ): RemoveClassroomsTagCommand {
    return cleanObject({
      where: cleanObject({
        classroomsTagId: cleanValue(command?.where?.classroomsTagId)
      })
    });
  }
}
