import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { RemoveCourseStudentCommand } from '@/commands/implements/course-students/remove-course-student.command';
import {
  CourseStudentNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindCourseStudentByIdRepository } from '@/repositories/course-students/find-course-student-by-id';
import { RemoveCourseStudentRepository } from '@/repositories/course-students/remove-course-student';

type RemoveCourseStudentCommandKeys = keyof RemoveCourseStudentCommand;

@CommandHandler(RemoveCourseStudentCommand)
export class RemoveCourseStudentCommandHandler
  implements ICommandHandler<RemoveCourseStudentCommand>
{
  constructor(
    private readonly findCourseStudentByIdRepository: FindCourseStudentByIdRepository,
    private readonly removeCourseStudentRepository: RemoveCourseStudentRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemoveCourseStudentCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data.where?.removedBy) {
      throw new ParamNotFoundException('removedBy');
    }
    const courseStudentId = splitServiceId(data.where?.courseStudentId)?.id;
    if (!courseStudentId) {
      throw new ParamNotFoundException('courseStudentId');
    }

    const courseStudent = await this.findCourseStudentByIdRepository.execute(
      courseStudentId
    );
    if (!courseStudent) {
      throw new CourseStudentNotFoundException();
    }

    const removed = await this.removeCourseStudentRepository.execute({
      where: {
        ...data.where,
        courseStudentId
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const courseStudentModel = this.publisher.mergeObjectContext(courseStudent);
    courseStudentModel.removedCourseStudent({
      removedBy: data.where.removedBy
    });
    courseStudentModel.commit();

    return courseStudent;
  }

  private clearData(
    command: RemoveCourseStudentCommand
  ): RemoveCourseStudentCommand {
    return cleanObject({
      where: cleanObject({
        removedBy: cleanValue(command?.where?.removedBy),
        courseStudentId: cleanValue(command?.where?.courseStudentId)
      })
    });
  }
}
