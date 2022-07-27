import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { UpdateCourseCommand } from '@/commands/implements/courses/update-course.command';
import {
  CourseNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindCourseByIdRepository } from '@/repositories/courses/find-course-by-id';
import { UpdateCourseRepository } from '@/repositories/courses/update-course';

@CommandHandler(UpdateCourseCommand)
export class UpdateCourseCommandHandler
  implements ICommandHandler<UpdateCourseCommand>
{
  constructor(
    private readonly findCourseByIdRepository: FindCourseByIdRepository,
    private readonly updateCourseRepository: UpdateCourseRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdateCourseCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    const courseId = splitServiceId(data.where?.course)?.id;
    if (!courseId) {
      throw new ParamNotFoundException('courseId');
    }

    const course = await this.findCourseByIdRepository.execute(courseId);
    if (!course) {
      throw new CourseNotFoundException();
    }

    const updated = await this.updateCourseRepository.execute({
      ...data,
      where: {
        ...data.where,
        course: courseId
      }
    });
    if (!updated) {
      throw new DataNotFoundException();
    }

    const courseUpdated = await this.findCourseByIdRepository.execute(courseId);
    if (!courseUpdated) {
      throw new CourseNotFoundException();
    }
    const courseModel = this.publisher.mergeObjectContext(courseUpdated);
    courseModel.updatedCourse({
      updatedBy: data.data.updatedBy
    });
    courseModel.commit();

    return courseUpdated;
  }

  private clearData(command: UpdateCourseCommand): UpdateCourseCommand {
    return cleanObject({
      where: cleanObject({
        app: cleanValue(command?.where?.app),
        parent: cleanValue(command?.where?.parent),
        course: cleanValue(command?.where?.course)
      }),
      data: cleanObject({
        name: cleanValue(command?.data?.name),
        description: cleanValue(command?.data?.description),
        avatar: cleanValue(command?.data?.avatar),
        updatedBy: cleanValue(command?.data?.updatedBy)
      })
    });
  }
}
