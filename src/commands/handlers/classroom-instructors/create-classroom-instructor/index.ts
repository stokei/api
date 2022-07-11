import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreateClassroomInstructorCommand } from '@/commands/implements/classroom-instructors/create-classroom-instructor.command';
import {
  ClassroomInstructorNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CreateClassroomInstructorRepository } from '@/repositories/classroom-instructors/create-classroom-instructor';

type CreateClassroomInstructorCommandKeys =
  keyof CreateClassroomInstructorCommand;

@CommandHandler(CreateClassroomInstructorCommand)
export class CreateClassroomInstructorCommandHandler
  implements ICommandHandler<CreateClassroomInstructorCommand>
{
  constructor(
    private readonly createClassroomInstructorRepository: CreateClassroomInstructorRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateClassroomInstructorCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.parent) {
      throw new ParamNotFoundException<CreateClassroomInstructorCommandKeys>(
        'parent'
      );
    }

    const classroomInstructorCreated =
      await this.createClassroomInstructorRepository.execute(data);
    if (!classroomInstructorCreated) {
      throw new ClassroomInstructorNotFoundException();
    }
    const classroomInstructorModel = this.publisher.mergeObjectContext(
      classroomInstructorCreated
    );
    classroomInstructorModel.createdClassroomInstructor({
      createdBy: data.createdBy
    });
    classroomInstructorModel.commit();

    return classroomInstructorCreated;
  }

  private clearData(
    command: CreateClassroomInstructorCommand
  ): CreateClassroomInstructorCommand {
    return cleanObject({
      name: cleanValue(command?.name),
      parent: cleanValue(command?.parent)
    });
  }
}