import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { UpdateClassroomsInstructorCommand } from '@/commands/implements/classrooms-instructors/update-classrooms-instructor.command';
import {
  ClassroomsInstructorNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindClassroomsInstructorByIdRepository } from '@/repositories/classrooms-instructors/find-classrooms-instructor-by-id';
import { UpdateClassroomsInstructorRepository } from '@/repositories/classrooms-instructors/update-classrooms-instructor';

type UpdateClassroomsInstructorCommandKeys =
  keyof UpdateClassroomsInstructorCommand;

@CommandHandler(UpdateClassroomsInstructorCommand)
export class UpdateClassroomsInstructorCommandHandler
  implements ICommandHandler<UpdateClassroomsInstructorCommand>
{
  constructor(
    private readonly findClassroomsInstructorByIdRepository: FindClassroomsInstructorByIdRepository,
    private readonly updateClassroomsInstructorRepository: UpdateClassroomsInstructorRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdateClassroomsInstructorCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    const classroomsInstructorId = splitServiceId(
      data.where?.classroomsInstructorId
    )?.id;
    if (!classroomsInstructorId) {
      throw new ParamNotFoundException('classroomsInstructorId');
    }

    const classroomsInstructor =
      await this.findClassroomsInstructorByIdRepository.execute(
        classroomsInstructorId
      );
    if (!classroomsInstructor) {
      throw new ClassroomsInstructorNotFoundException();
    }

    const updated = await this.updateClassroomsInstructorRepository.execute({
      ...data,
      where: {
        ...data.where,
        classroomsInstructorId
      }
    });
    if (!updated) {
      throw new DataNotFoundException();
    }

    const classroomsInstructorUpdated =
      await this.findClassroomsInstructorByIdRepository.execute(
        classroomsInstructorId
      );
    if (!classroomsInstructorUpdated) {
      throw new ClassroomsInstructorNotFoundException();
    }
    const classroomsInstructorModel = this.publisher.mergeObjectContext(
      classroomsInstructorUpdated
    );
    classroomsInstructorModel.updatedClassroomsInstructor({
      updatedBy: data.data.updatedBy
    });
    classroomsInstructorModel.commit();

    return classroomsInstructorUpdated;
  }

  private clearData(
    command: UpdateClassroomsInstructorCommand
  ): UpdateClassroomsInstructorCommand {
    return cleanObject({
      where: cleanObject({
        classroomsInstructorId: cleanValue(
          command?.where?.classroomsInstructorId
        )
      }),
      data: cleanObject({
        name: cleanValue(command?.data?.name),
        updatedBy: cleanValue(command?.data?.updatedBy)
      })
    });
  }
}
