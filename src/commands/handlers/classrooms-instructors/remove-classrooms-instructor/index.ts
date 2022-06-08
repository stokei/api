import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RemoveClassroomsInstructorCommand } from '@/commands/implements/classrooms-instructors/remove-classrooms-instructor.command';
import {
  ClassroomsInstructorNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindClassroomsInstructorByIdRepository } from '@/repositories/classrooms-instructors/find-classrooms-instructor-by-id';
import { RemoveClassroomsInstructorRepository } from '@/repositories/classrooms-instructors/remove-classrooms-instructor';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

type RemoveClassroomsInstructorCommandKeys =
  keyof RemoveClassroomsInstructorCommand;

@CommandHandler(RemoveClassroomsInstructorCommand)
export class RemoveClassroomsInstructorCommandHandler
  implements ICommandHandler<RemoveClassroomsInstructorCommand>
{
  constructor(
    private readonly findClassroomsInstructorByIdRepository: FindClassroomsInstructorByIdRepository,
    private readonly removeClassroomsInstructorRepository: RemoveClassroomsInstructorRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemoveClassroomsInstructorCommand) {
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

    const removed = await this.removeClassroomsInstructorRepository.execute({
      where: {
        classroomsInstructorId
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const classroomsInstructorModel =
      this.publisher.mergeObjectContext(classroomsInstructor);
    classroomsInstructorModel.removedClassroomsInstructor();
    classroomsInstructorModel.commit();

    return classroomsInstructor;
  }

  private clearData(
    command: RemoveClassroomsInstructorCommand
  ): RemoveClassroomsInstructorCommand {
    return cleanObject({
      where: cleanObject({
        classroomsInstructorId: cleanValue(
          command?.where?.classroomsInstructorId
        )
      })
    });
  }
}
