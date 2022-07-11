import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { UpdateCourseInstructorCommand } from '@/commands/implements/course-instructors/update-course-instructor.command';
import {
  CourseInstructorNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindCourseInstructorByIdRepository } from '@/repositories/course-instructors/find-course-instructor-by-id';
import { UpdateCourseInstructorRepository } from '@/repositories/course-instructors/update-course-instructor';

type UpdateCourseInstructorCommandKeys = keyof UpdateCourseInstructorCommand;

@CommandHandler(UpdateCourseInstructorCommand)
export class UpdateCourseInstructorCommandHandler
  implements ICommandHandler<UpdateCourseInstructorCommand>
{
  constructor(
    private readonly findCourseInstructorByIdRepository: FindCourseInstructorByIdRepository,
    private readonly updateCourseInstructorRepository: UpdateCourseInstructorRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdateCourseInstructorCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
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

    const updated = await this.updateCourseInstructorRepository.execute({
      ...data,
      where: {
        ...data.where,
        courseInstructorId
      }
    });
    if (!updated) {
      throw new DataNotFoundException();
    }

    const courseInstructorUpdated =
      await this.findCourseInstructorByIdRepository.execute(courseInstructorId);
    if (!courseInstructorUpdated) {
      throw new CourseInstructorNotFoundException();
    }
    const courseInstructorModel = this.publisher.mergeObjectContext(
      courseInstructorUpdated
    );
    courseInstructorModel.updatedCourseInstructor({
      updatedBy: data.data.updatedBy
    });
    courseInstructorModel.commit();

    return courseInstructorUpdated;
  }

  private clearData(
    command: UpdateCourseInstructorCommand
  ): UpdateCourseInstructorCommand {
    return cleanObject({
      where: cleanObject({
        courseInstructorId: cleanValue(command?.where?.courseInstructorId)
      }),
      data: cleanObject({
        name: cleanValue(command?.data?.name),
        updatedBy: cleanValue(command?.data?.updatedBy)
      })
    });
  }
}
