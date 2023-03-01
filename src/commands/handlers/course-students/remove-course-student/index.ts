import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { RemoveCourseStudentCommand } from '@/commands/implements/course-students/remove-course-student.command';
import {
  CourseStudentNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { RemoveCourseStudentRepository } from '@/repositories/course-students/remove-course-student';
import { FindAllCourseStudentsService } from '@/services/course-students/find-all-course-students';

@CommandHandler(RemoveCourseStudentCommand)
export class RemoveCourseStudentCommandHandler
  implements ICommandHandler<RemoveCourseStudentCommand>
{
  constructor(
    private readonly findAllCourseStudentsService: FindAllCourseStudentsService,
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
    const { course, student, app } = data.where || {};
    if (!course) {
      throw new ParamNotFoundException('courseId');
    }
    if (!student) {
      throw new ParamNotFoundException('studentId');
    }

    const courseStudents = await this.findAllCourseStudentsService.execute({
      where: {
        AND: {
          app: {
            equals: app
          },
          course: {
            equals: course
          },
          student: {
            equals: student
          }
        }
      }
    });
    if (!courseStudents?.totalCount) {
      throw new CourseStudentNotFoundException();
    }

    const allCourseStudents = await this.findAllCourseStudentsService.execute({
      where: {
        AND: {
          app: {
            equals: app
          },
          student: {
            equals: student
          }
        }
      },
      page: {
        limit: 1
      }
    });

    const courseStudent = courseStudents[0];
    const removed = await this.removeCourseStudentRepository.execute({
      where: {
        ...data.where,
        course,
        student
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }

    const isLastCourseStudent = allCourseStudents?.totalCount === 1;
    const courseStudentModel = this.publisher.mergeObjectContext(courseStudent);
    courseStudentModel.removedCourseStudent({
      isLastCourseStudent,
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
        app: cleanValue(command?.where?.app),
        course: cleanValue(command?.where?.course),
        student: cleanValue(command?.where?.student)
      })
    });
  }
}
