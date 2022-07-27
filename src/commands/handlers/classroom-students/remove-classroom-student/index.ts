import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { RemoveClassroomStudentCommand } from '@/commands/implements/classroom-students/remove-classroom-student.command';
import {
  ClassroomStudentNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindAllClassroomStudentsRepository } from '@/repositories/classroom-students/find-all-classroom-students';
import { RemoveClassroomStudentRepository } from '@/repositories/classroom-students/remove-classroom-student';

@CommandHandler(RemoveClassroomStudentCommand)
export class RemoveClassroomStudentCommandHandler
  implements ICommandHandler<RemoveClassroomStudentCommand>
{
  constructor(
    private readonly findAllClassroomStudentsRepository: FindAllClassroomStudentsRepository,
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
    const { classroom, student, app } = data.where || {};
    if (!classroom) {
      throw new ParamNotFoundException('classroomId');
    }
    if (!student) {
      throw new ParamNotFoundException('studentId');
    }

    const classroomStudents =
      await this.findAllClassroomStudentsRepository.execute({
        where: {
          AND: {
            app: {
              equals: app
            },
            classroom: {
              equals: classroom
            },
            student: {
              equals: student
            }
          }
        }
      });
    if (!classroomStudents?.length) {
      throw new ClassroomStudentNotFoundException();
    }
    const classroomStudent = classroomStudents[0];
    const removed = await this.removeClassroomStudentRepository.execute({
      where: {
        ...data.where,
        classroom,
        student
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
        app: cleanValue(command?.where?.app),
        classroom: cleanValue(command?.where?.classroom),
        student: cleanValue(command?.where?.student)
      })
    });
  }
}
