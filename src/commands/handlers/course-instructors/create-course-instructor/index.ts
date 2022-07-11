import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreateCourseInstructorCommand } from '@/commands/implements/course-instructors/create-course-instructor.command';
import {
  CourseInstructorNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CreateCourseInstructorRepository } from '@/repositories/course-instructors/create-course-instructor';

type CreateCourseInstructorCommandKeys = keyof CreateCourseInstructorCommand;

@CommandHandler(CreateCourseInstructorCommand)
export class CreateCourseInstructorCommandHandler
  implements ICommandHandler<CreateCourseInstructorCommand>
{
  constructor(
    private readonly createCourseInstructorRepository: CreateCourseInstructorRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateCourseInstructorCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.parent) {
      throw new ParamNotFoundException<CreateCourseInstructorCommandKeys>(
        'parent'
      );
    }

    const courseInstructorCreated =
      await this.createCourseInstructorRepository.execute(data);
    if (!courseInstructorCreated) {
      throw new CourseInstructorNotFoundException();
    }
    const courseInstructorModel = this.publisher.mergeObjectContext(
      courseInstructorCreated
    );
    courseInstructorModel.createdCourseInstructor({
      createdBy: data.createdBy
    });
    courseInstructorModel.commit();

    return courseInstructorCreated;
  }

  private clearData(
    command: CreateCourseInstructorCommand
  ): CreateCourseInstructorCommand {
    return cleanObject({
      name: cleanValue(command?.name),
      parent: cleanValue(command?.parent)
    });
  }
}
