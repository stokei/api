import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { UpdateCoursesInstructorCommand } from '@/commands/implements/courses-instructors/update-courses-instructor.command';
import {
  CoursesInstructorNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindCoursesInstructorByIdRepository } from '@/repositories/courses-instructors/find-courses-instructor-by-id';
import { UpdateCoursesInstructorRepository } from '@/repositories/courses-instructors/update-courses-instructor';

type UpdateCoursesInstructorCommandKeys = keyof UpdateCoursesInstructorCommand;

@CommandHandler(UpdateCoursesInstructorCommand)
export class UpdateCoursesInstructorCommandHandler
  implements ICommandHandler<UpdateCoursesInstructorCommand>
{
  constructor(
    private readonly findCoursesInstructorByIdRepository: FindCoursesInstructorByIdRepository,
    private readonly updateCoursesInstructorRepository: UpdateCoursesInstructorRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdateCoursesInstructorCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
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

    const updated = await this.updateCoursesInstructorRepository.execute({
      ...data,
      where: {
        ...data.where,
        coursesInstructorId
      }
    });
    if (!updated) {
      throw new DataNotFoundException();
    }

    const coursesInstructorUpdated =
      await this.findCoursesInstructorByIdRepository.execute(
        coursesInstructorId
      );
    if (!coursesInstructorUpdated) {
      throw new CoursesInstructorNotFoundException();
    }
    const coursesInstructorModel = this.publisher.mergeObjectContext(
      coursesInstructorUpdated
    );
    coursesInstructorModel.updatedCoursesInstructor({
      updatedBy: data.data.updatedBy
    });
    coursesInstructorModel.commit();

    return coursesInstructorUpdated;
  }

  private clearData(
    command: UpdateCoursesInstructorCommand
  ): UpdateCoursesInstructorCommand {
    return cleanObject({
      where: cleanObject({
        coursesInstructorId: cleanValue(command?.where?.coursesInstructorId)
      }),
      data: cleanObject({
        name: cleanValue(command?.data?.name),
        updatedBy: cleanValue(command?.data?.updatedBy)
      })
    });
  }
}
