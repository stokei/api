import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { RemoveClassroomInstructorCommand } from '@/commands/implements/classroom-instructors/remove-classroom-instructor.command';
import {
  ClassroomInstructorNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindClassroomInstructorByIdRepository } from '@/repositories/classroom-instructors/find-classroom-instructor-by-id';
import { RemoveClassroomInstructorRepository } from '@/repositories/classroom-instructors/remove-classroom-instructor';

type RemoveClassroomInstructorCommandKeys =
  keyof RemoveClassroomInstructorCommand;

@CommandHandler(RemoveClassroomInstructorCommand)
export class RemoveClassroomInstructorCommandHandler
  implements ICommandHandler<RemoveClassroomInstructorCommand>
{
  constructor(
    private readonly findClassroomInstructorByIdRepository: FindClassroomInstructorByIdRepository,
    private readonly removeClassroomInstructorRepository: RemoveClassroomInstructorRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemoveClassroomInstructorCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data.where?.removedBy) {
      throw new ParamNotFoundException('removedBy');
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

    const removed = await this.removeClassroomInstructorRepository.execute({
      where: {
        ...data.where,
        classroomInstructorId
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const classroomInstructorModel =
      this.publisher.mergeObjectContext(classroomInstructor);
    classroomInstructorModel.removedClassroomInstructor({
      removedBy: data.where.removedBy
    });
    classroomInstructorModel.commit();

    return classroomInstructor;
  }

  private clearData(
    command: RemoveClassroomInstructorCommand
  ): RemoveClassroomInstructorCommand {
    return cleanObject({
      where: cleanObject({
        removedBy: cleanValue(command?.where?.removedBy),
        classroomInstructorId: cleanValue(command?.where?.classroomInstructorId)
      })
    });
  }
}
