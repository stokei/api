import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { UpdateClassroomInstructorCommand } from '@/commands/implements/classroom-instructors/update-classroom-instructor.command';
import {
  ClassroomInstructorNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindClassroomInstructorByIdRepository } from '@/repositories/classroom-instructors/find-classroom-instructor-by-id';
import { UpdateClassroomInstructorRepository } from '@/repositories/classroom-instructors/update-classroom-instructor';

type UpdateClassroomInstructorCommandKeys =
  keyof UpdateClassroomInstructorCommand;

@CommandHandler(UpdateClassroomInstructorCommand)
export class UpdateClassroomInstructorCommandHandler
  implements ICommandHandler<UpdateClassroomInstructorCommand>
{
  constructor(
    private readonly findClassroomInstructorByIdRepository: FindClassroomInstructorByIdRepository,
    private readonly updateClassroomInstructorRepository: UpdateClassroomInstructorRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdateClassroomInstructorCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    const classroomInstructorId = splitServiceId(
      data.where?.classroomInstructorId
    )?.id;
    if (!classroomInstructorId) {
      throw new ParamNotFoundException('classroomInstructorId');
    }

    const classroomInstructor =
      await this.findClassroomInstructorByIdRepository.execute(
        classroomInstructorId
      );
    if (!classroomInstructor) {
      throw new ClassroomInstructorNotFoundException();
    }

    const updated = await this.updateClassroomInstructorRepository.execute({
      ...data,
      where: {
        ...data.where,
        classroomInstructorId
      }
    });
    if (!updated) {
      throw new DataNotFoundException();
    }

    const classroomInstructorUpdated =
      await this.findClassroomInstructorByIdRepository.execute(
        classroomInstructorId
      );
    if (!classroomInstructorUpdated) {
      throw new ClassroomInstructorNotFoundException();
    }
    const classroomInstructorModel = this.publisher.mergeObjectContext(
      classroomInstructorUpdated
    );
    classroomInstructorModel.updatedClassroomInstructor({
      updatedBy: data.data.updatedBy
    });
    classroomInstructorModel.commit();

    return classroomInstructorUpdated;
  }

  private clearData(
    command: UpdateClassroomInstructorCommand
  ): UpdateClassroomInstructorCommand {
    return cleanObject({
      where: cleanObject({
        classroomInstructorId: cleanValue(command?.where?.classroomInstructorId)
      }),
      data: cleanObject({
        name: cleanValue(command?.data?.name),
        updatedBy: cleanValue(command?.data?.updatedBy)
      })
    });
  }
}
