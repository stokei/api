import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateClassroomsInstructorCommand } from '@/commands/implements/classrooms-instructors/create-classrooms-instructor.command';
import {
  ClassroomsInstructorNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CreateClassroomsInstructorRepository } from '@/repositories/classrooms-instructors/create-classrooms-instructor';
import { cleanObject, cleanValue } from '@stokei/nestjs';

type CreateClassroomsInstructorCommandKeys =
  keyof CreateClassroomsInstructorCommand;

@CommandHandler(CreateClassroomsInstructorCommand)
export class CreateClassroomsInstructorCommandHandler
  implements ICommandHandler<CreateClassroomsInstructorCommand>
{
  constructor(
    private readonly createClassroomsInstructorRepository: CreateClassroomsInstructorRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateClassroomsInstructorCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.parent) {
      throw new ParamNotFoundException<CreateClassroomsInstructorCommandKeys>(
        'parent'
      );
    }

    const classroomsInstructorCreated =
      await this.createClassroomsInstructorRepository.execute(data);
    if (!classroomsInstructorCreated) {
      throw new ClassroomsInstructorNotFoundException();
    }
    const classroomsInstructorModel = this.publisher.mergeObjectContext(
      classroomsInstructorCreated
    );
    classroomsInstructorModel.createdClassroomsInstructor();
    classroomsInstructorModel.commit();

    return classroomsInstructorCreated;
  }

  private clearData(
    command: CreateClassroomsInstructorCommand
  ): CreateClassroomsInstructorCommand {
    return cleanObject({
      name: cleanValue(command?.name),
      parent: cleanValue(command?.parent)
    });
  }
}
