import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { RemoveCourseInstructorCommand } from '@/commands/implements/course-instructors/remove-course-instructor.command';
import {
  CourseInstructorNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindCourseInstructorByIdRepository } from '@/repositories/course-instructors/find-course-instructor-by-id';
import { RemoveCourseInstructorRepository } from '@/repositories/course-instructors/remove-course-instructor';

type RemoveCourseInstructorCommandKeys = keyof RemoveCourseInstructorCommand;

@CommandHandler(RemoveCourseInstructorCommand)
export class RemoveCourseInstructorCommandHandler
  implements ICommandHandler<RemoveCourseInstructorCommand>
{
  constructor(
    private readonly findCourseInstructorByIdRepository: FindCourseInstructorByIdRepository,
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
    const courseInstructorId = splitServiceId(
      data.where?.courseInstructorId
    )?.id;
    if (!courseInstructorId) {
      throw new ParamNotFoundException('courseInstructorId');
    }

    const courseInstructor =
      await this.findCourseInstructorByIdRepository.execute(courseInstructorId);
    if (!courseInstructor) {
      throw new CourseInstructorNotFoundException();
    }

    const removed = await this.removeCourseInstructorRepository.execute({
      where: {
        ...data.where,
        courseInstructorId
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const courseInstructorModel =
      this.publisher.mergeObjectContext(courseInstructor);
    courseInstructorModel.removedCourseInstructor({
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
        courseInstructorId: cleanValue(command?.where?.courseInstructorId)
      })
    });
  }
}
