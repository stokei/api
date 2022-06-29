import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { RemoveCoursesInstructorCommand } from '@/commands/implements/courses-instructors/remove-courses-instructor.command';
import {
  CoursesInstructorNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindCoursesInstructorByIdRepository } from '@/repositories/courses-instructors/find-courses-instructor-by-id';
import { RemoveCoursesInstructorRepository } from '@/repositories/courses-instructors/remove-courses-instructor';

type RemoveCoursesInstructorCommandKeys = keyof RemoveCoursesInstructorCommand;

@CommandHandler(RemoveCoursesInstructorCommand)
export class RemoveCoursesInstructorCommandHandler
  implements ICommandHandler<RemoveCoursesInstructorCommand>
{
  constructor(
    private readonly findCoursesInstructorByIdRepository: FindCoursesInstructorByIdRepository,
    private readonly removeCoursesInstructorRepository: RemoveCoursesInstructorRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemoveCoursesInstructorCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data.where?.removedBy) {
      throw new ParamNotFoundException('removedBy');
    }
    const coursesInstructorId = splitServiceId(
      data.where?.coursesInstructorId
    )?.id;
    if (!coursesInstructorId) {
      throw new ParamNotFoundException('coursesInstructorId');
    }

    const coursesInstructor =
      await this.findCoursesInstructorByIdRepository.execute(
        coursesInstructorId
      );
    if (!coursesInstructor) {
      throw new CoursesInstructorNotFoundException();
    }

    const removed = await this.removeCoursesInstructorRepository.execute({
      where: {
        ...data.where,
        coursesInstructorId
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const coursesInstructorModel =
      this.publisher.mergeObjectContext(coursesInstructor);
    coursesInstructorModel.removedCoursesInstructor({
      removedBy: data.where.removedBy
    });
    coursesInstructorModel.commit();

    return coursesInstructor;
  }

  private clearData(
    command: RemoveCoursesInstructorCommand
  ): RemoveCoursesInstructorCommand {
    return cleanObject({
      where: cleanObject({
        removedBy: cleanValue(command?.where?.removedBy),
        coursesInstructorId: cleanValue(command?.where?.coursesInstructorId)
      })
    });
  }
}
