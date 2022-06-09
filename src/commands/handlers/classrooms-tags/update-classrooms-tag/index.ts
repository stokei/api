import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { UpdateClassroomsTagCommand } from '@/commands/implements/classrooms-tags/update-classrooms-tag.command';
import {
  ClassroomsTagNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindClassroomsTagByIdRepository } from '@/repositories/classrooms-tags/find-classrooms-tag-by-id';
import { UpdateClassroomsTagRepository } from '@/repositories/classrooms-tags/update-classrooms-tag';

type UpdateClassroomsTagCommandKeys = keyof UpdateClassroomsTagCommand;

@CommandHandler(UpdateClassroomsTagCommand)
export class UpdateClassroomsTagCommandHandler
  implements ICommandHandler<UpdateClassroomsTagCommand>
{
  constructor(
    private readonly findClassroomsTagByIdRepository: FindClassroomsTagByIdRepository,
    private readonly updateClassroomsTagRepository: UpdateClassroomsTagRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdateClassroomsTagCommand) {
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

    const updated = await this.updateClassroomsTagRepository.execute({
      ...data,
      where: {
        ...data.where,
        classroomsTagId
      }
    });
    if (!updated) {
      throw new DataNotFoundException();
    }

    const classroomsTagUpdated =
      await this.findClassroomsTagByIdRepository.execute(classroomsTagId);
    if (!classroomsTagUpdated) {
      throw new ClassroomsTagNotFoundException();
    }
    const classroomsTagModel =
      this.publisher.mergeObjectContext(classroomsTagUpdated);
    classroomsTagModel.updatedClassroomsTag();
    classroomsTagModel.commit();

    return classroomsTagUpdated;
  }

  private clearData(
    command: UpdateClassroomsTagCommand
  ): UpdateClassroomsTagCommand {
    return cleanObject({
      where: cleanObject({
        classroomsTagId: cleanValue(command?.where?.classroomsTagId)
      }),
      data: cleanObject({
        name: cleanValue(command?.data?.name)
      })
    });
  }
}
