import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UpdateCourseCommand } from '@/commands/implements/courses/update-course.command';
import {
  CourseNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindCourseByIdRepository } from '@/repositories/courses/find-course-by-id';
import { UpdateCourseRepository } from '@/repositories/courses/update-course';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

type UpdateCourseCommandKeys = keyof UpdateCourseCommand;

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
    const courseId = splitServiceId(data.where?.courseId)?.id;
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
        courseId
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
    courseModel.updatedCourse();
    courseModel.commit();

    return courseUpdated;
  }

  private clearData(command: UpdateCourseCommand): UpdateCourseCommand {
    return cleanObject({
      where: cleanObject({
        courseId: cleanValue(command?.where?.courseId)
      }),
      data: cleanObject({
        name: cleanValue(command?.data?.name)
      })
    });
  }
}
