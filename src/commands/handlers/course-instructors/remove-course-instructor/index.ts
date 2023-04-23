import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { RemoveCourseInstructorCommand } from '@/commands/implements/course-instructors/remove-course-instructor.command';
import {
  CourseInstructorNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { RemoveCourseInstructorRepository } from '@/repositories/course-instructors/remove-course-instructor';
import { FindAllCourseInstructorsService } from '@/services/course-instructors/find-all-course-instructors';

@CommandHandler(RemoveCourseInstructorCommand)
export class RemoveCourseInstructorCommandHandler
  implements ICommandHandler<RemoveCourseInstructorCommand>
{
  constructor(
    private readonly findAllCourseInstructorsService: FindAllCourseInstructorsService,
    private readonly removeCourseInstructorRepository: RemoveCourseInstructorRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemoveCourseInstructorCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data.where?.removedBy) {
      throw new ParamNotFoundException('removedBy');
    }
    const { course, instructor, app } = data.where || {};
    if (!course) {
      throw new ParamNotFoundException('courseId');
    }
    if (!instructor) {
      throw new ParamNotFoundException('instructorId');
    }

    const courseInstructors =
      await this.findAllCourseInstructorsService.execute({
        where: {
          AND: {
            app: {
              equals: app
            },
            course: {
              equals: course
            },
            instructor: {
              equals: instructor
            }
          }
        }
      });
    if (!courseInstructors?.totalCount) {
      throw new CourseInstructorNotFoundException();
    }

    const allCourseInstructors =
      await this.findAllCourseInstructorsService.execute({
        where: {
          AND: {
            app: {
              equals: app
            },
            instructor: {
              equals: instructor
            }
          }
        },
        page: {
          limit: 1
        }
      });

    const courseInstructor = courseInstructors?.items?.[0];
    const removed = await this.removeCourseInstructorRepository.execute({
      where: {
        ...data.where,
        course,
        instructor
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const isLastCourseInstructor = allCourseInstructors?.totalCount === 1;
    const courseInstructorModel =
      this.publisher.mergeObjectContext(courseInstructor);
    courseInstructorModel.removedCourseInstructor({
      isLastCourseInstructor,
      removedBy: data.where.removedBy
    });
    courseInstructorModel.commit();

    return courseInstructor;
  }

  private clearData(
    command: RemoveCourseInstructorCommand
  ): RemoveCourseInstructorCommand {
    return cleanObject({
      where: cleanObject({
        removedBy: cleanValue(command?.where?.removedBy),
        app: cleanValue(command?.where?.app),
        course: cleanValue(command?.where?.course),
        instructor: cleanValue(command?.where?.instructor)
      })
    });
  }
}
