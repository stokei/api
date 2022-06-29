import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { RemoveCourseCommand } from '@/commands/implements/courses/remove-course.command';
import {
  CourseNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindCourseByIdRepository } from '@/repositories/courses/find-course-by-id';
import { RemoveCourseRepository } from '@/repositories/courses/remove-course';

type RemoveCourseCommandKeys = keyof RemoveCourseCommand;

@CommandHandler(RemoveCourseCommand)
export class RemoveCourseCommandHandler
  implements ICommandHandler<RemoveCourseCommand>
{
  constructor(
    private readonly findCourseByIdRepository: FindCourseByIdRepository,
    private readonly removeCourseRepository: RemoveCourseRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemoveCourseCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data.where?.removedBy) {
      throw new ParamNotFoundException('removedBy');
    }
    const courseId = splitServiceId(data.where?.courseId)?.id;
    if (!courseId) {
      throw new ParamNotFoundException('courseId');
    }

    const course = await this.findCourseByIdRepository.execute(courseId);
    if (!course) {
      throw new CourseNotFoundException();
    }

    const removed = await this.removeCourseRepository.execute({
      where: {
        ...data.where,
        courseId
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const courseModel = this.publisher.mergeObjectContext(course);
    courseModel.removedCourse();
    courseModel.commit();

    return course;
  }

  private clearData(command: RemoveCourseCommand): RemoveCourseCommand {
    return cleanObject({
      where: cleanObject({
        removedBy: cleanValue(command?.where?.removedBy),
        courseId: cleanValue(command?.where?.courseId)
      })
    });
  }
}
