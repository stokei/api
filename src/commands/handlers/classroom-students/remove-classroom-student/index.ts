import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { RemoveClassroomStudentCommand } from '@/commands/implements/classroom-students/remove-classroom-student.command';
import {
  ClassroomStudentNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindClassroomStudentByIdRepository } from '@/repositories/classroom-students/find-classroom-student-by-id';
import { RemoveClassroomStudentRepository } from '@/repositories/classroom-students/remove-classroom-student';

type RemoveClassroomStudentCommandKeys = keyof RemoveClassroomStudentCommand;

@CommandHandler(RemoveClassroomStudentCommand)
export class RemoveClassroomStudentCommandHandler
  implements ICommandHandler<RemoveClassroomStudentCommand>
{
  constructor(
    private readonly findClassroomStudentByIdRepository: FindClassroomStudentByIdRepository,
    private readonly removeClassroomStudentRepository: RemoveClassroomStudentRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemoveClassroomStudentCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data.where?.removedBy) {
      throw new ParamNotFoundException('removedBy');
    }
    const classroomStudentId = splitServiceId(
      data.where?.classroomStudentId
    )?.id;
    if (!classroomStudentId) {
      throw new ParamNotFoundException('classroomStudentId');
    }

    const classroomStudent =
      await this.findClassroomStudentByIdRepository.execute(classroomStudentId);
    if (!classroomStudent) {
      throw new ClassroomStudentNotFoundException();
    }

    const removed = await this.removeClassroomStudentRepository.execute({
      where: {
        ...data.where,
        classroomStudentId
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const classroomStudentModel =
      this.publisher.mergeObjectContext(classroomStudent);
    classroomStudentModel.removedClassroomStudent({
      removedBy: data.where.removedBy
    });
    classroomStudentModel.commit();

    return classroomStudent;
  }

  private clearData(
    command: RemoveClassroomStudentCommand
  ): RemoveClassroomStudentCommand {
    return cleanObject({
      where: cleanObject({
        removedBy: cleanValue(command?.where?.removedBy),
        classroomStudentId: cleanValue(command?.where?.classroomStudentId)
      })
    });
  }
}
