import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { RemoveClassroomsStudentCommand } from '@/commands/implements/classrooms-students/remove-classrooms-student.command';
import {
  ClassroomsStudentNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindClassroomsStudentByIdRepository } from '@/repositories/classrooms-students/find-classrooms-student-by-id';
import { RemoveClassroomsStudentRepository } from '@/repositories/classrooms-students/remove-classrooms-student';

type RemoveClassroomsStudentCommandKeys = keyof RemoveClassroomsStudentCommand;

@CommandHandler(RemoveClassroomsStudentCommand)
export class RemoveClassroomsStudentCommandHandler
  implements ICommandHandler<RemoveClassroomsStudentCommand>
{
  constructor(
    private readonly findClassroomsStudentByIdRepository: FindClassroomsStudentByIdRepository,
    private readonly removeClassroomsStudentRepository: RemoveClassroomsStudentRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemoveClassroomsStudentCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data.where?.removedBy) {
      throw new ParamNotFoundException('removedBy');
    }
    const classroomsStudentId = splitServiceId(
      data.where?.classroomsStudentId
    )?.id;
    if (!classroomsStudentId) {
      throw new ParamNotFoundException('classroomsStudentId');
    }

    const classroomsStudent =
      await this.findClassroomsStudentByIdRepository.execute(
        classroomsStudentId
      );
    if (!classroomsStudent) {
      throw new ClassroomsStudentNotFoundException();
    }

    const removed = await this.removeClassroomsStudentRepository.execute({
      where: {
        ...data.where,
        classroomsStudentId
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const classroomsStudentModel =
      this.publisher.mergeObjectContext(classroomsStudent);
    classroomsStudentModel.removedClassroomsStudent();
    classroomsStudentModel.commit();

    return classroomsStudent;
  }

  private clearData(
    command: RemoveClassroomsStudentCommand
  ): RemoveClassroomsStudentCommand {
    return cleanObject({
      where: cleanObject({
        removedBy: cleanValue(command?.where?.removedBy),
        classroomsStudentId: cleanValue(command?.where?.classroomsStudentId)
      })
    });
  }
}
