import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { RemoveClassroomCommand } from '@/commands/implements/classrooms/remove-classroom.command';
import {
  ClassroomNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindClassroomByIdRepository } from '@/repositories/classrooms/find-classroom-by-id';
import { RemoveClassroomRepository } from '@/repositories/classrooms/remove-classroom';

type RemoveClassroomCommandKeys = keyof RemoveClassroomCommand;

@CommandHandler(RemoveClassroomCommand)
export class RemoveClassroomCommandHandler
  implements ICommandHandler<RemoveClassroomCommand>
{
  constructor(
    private readonly findClassroomByIdRepository: FindClassroomByIdRepository,
    private readonly removeClassroomRepository: RemoveClassroomRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemoveClassroomCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data.where?.removedBy) {
      throw new ParamNotFoundException('removedBy');
    }
    const classroomId = splitServiceId(data.where?.classroomId)?.id;
    if (!classroomId) {
      throw new ParamNotFoundException('classroomId');
    }

    const classroom = await this.findClassroomByIdRepository.execute(
      classroomId
    );
    if (!classroom) {
      throw new ClassroomNotFoundException();
    }

    const removed = await this.removeClassroomRepository.execute({
      where: {
        ...data.where,
        classroomId
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const classroomModel = this.publisher.mergeObjectContext(classroom);
    classroomModel.removedClassroom();
    classroomModel.commit();

    return classroom;
  }

  private clearData(command: RemoveClassroomCommand): RemoveClassroomCommand {
    return cleanObject({
      where: cleanObject({
        removedBy: cleanValue(command?.where?.removedBy),
        classroomId: cleanValue(command?.where?.classroomId)
      })
    });
  }
}
