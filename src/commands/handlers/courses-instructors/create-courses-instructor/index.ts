import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreateCoursesInstructorCommand } from '@/commands/implements/courses-instructors/create-courses-instructor.command';
import {
  CoursesInstructorNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CreateCoursesInstructorRepository } from '@/repositories/courses-instructors/create-courses-instructor';

type CreateCoursesInstructorCommandKeys = keyof CreateCoursesInstructorCommand;

@CommandHandler(CreateCoursesInstructorCommand)
export class CreateCoursesInstructorCommandHandler
  implements ICommandHandler<CreateCoursesInstructorCommand>
{
  constructor(
    private readonly createCoursesInstructorRepository: CreateCoursesInstructorRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateCoursesInstructorCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.parent) {
      throw new ParamNotFoundException<CreateCoursesInstructorCommandKeys>(
        'parent'
      );
    }

    const coursesInstructorCreated =
      await this.createCoursesInstructorRepository.execute(data);
    if (!coursesInstructorCreated) {
      throw new CoursesInstructorNotFoundException();
    }
    const coursesInstructorModel = this.publisher.mergeObjectContext(
      coursesInstructorCreated
    );
    coursesInstructorModel.createdCoursesInstructor();
    coursesInstructorModel.commit();

    return coursesInstructorCreated;
  }

  private clearData(
    command: CreateCoursesInstructorCommand
  ): CreateCoursesInstructorCommand {
    return cleanObject({
      name: cleanValue(command?.name),
      parent: cleanValue(command?.parent)
    });
  }
}
