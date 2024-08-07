import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreateCourseInstructorCommand } from '@/commands/implements/course-instructors/create-course-instructor.command';
import {
  CourseInstructorAlreadyExistsException,
  CourseInstructorNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CreateCourseInstructorRepository } from '@/repositories/course-instructors/create-course-instructor';
import { ExistsCourseInstructorsRepository } from '@/repositories/course-instructors/exists-course-instructors';

type CreateCourseInstructorCommandKeys = keyof CreateCourseInstructorCommand;

@CommandHandler(CreateCourseInstructorCommand)
export class CreateCourseInstructorCommandHandler
  implements ICommandHandler<CreateCourseInstructorCommand>
{
  constructor(
    private readonly createCourseInstructorRepository: CreateCourseInstructorRepository,
    private readonly existsCourseInstructorsRepository: ExistsCourseInstructorsRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateCourseInstructorCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.course) {
      throw new ParamNotFoundException<CreateCourseInstructorCommandKeys>(
        'course'
      );
    }
    if (!data?.instructor) {
      throw new ParamNotFoundException<CreateCourseInstructorCommandKeys>(
        'instructor'
      );
    }

    const existsCourseInstructor =
      await this.existsCourseInstructorsRepository.execute({
        where: {
          course: data.course,
          instructor: data.instructor
        }
      });
    if (existsCourseInstructor) {
      throw new CourseInstructorAlreadyExistsException();
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
      createdBy: cleanValue(command?.createdBy),
      app: cleanValue(command?.app),
      instructor: cleanValue(command?.instructor),
      course: cleanValue(command?.course)
    });
  }
}
