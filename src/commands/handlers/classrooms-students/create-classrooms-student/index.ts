import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreateClassroomsStudentCommand } from '@/commands/implements/classrooms-students/create-classrooms-student.command';
import {
  ClassroomsStudentNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CreateClassroomsStudentRepository } from '@/repositories/classrooms-students/create-classrooms-student';

type CreateClassroomsStudentCommandKeys = keyof CreateClassroomsStudentCommand;

@CommandHandler(CreateClassroomsStudentCommand)
export class CreateClassroomsStudentCommandHandler
  implements ICommandHandler<CreateClassroomsStudentCommand>
{
  constructor(
    private readonly createClassroomsStudentRepository: CreateClassroomsStudentRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateClassroomsStudentCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.parent) {
      throw new ParamNotFoundException<CreateClassroomsStudentCommandKeys>(
        'parent'
      );
    }

    const classroomsStudentCreated =
      await this.createClassroomsStudentRepository.execute(data);
    if (!classroomsStudentCreated) {
      throw new ClassroomsStudentNotFoundException();
    }
    const classroomsStudentModel = this.publisher.mergeObjectContext(
      classroomsStudentCreated
    );
    classroomsStudentModel.createdClassroomsStudent();
    classroomsStudentModel.commit();

    return classroomsStudentCreated;
  }

  private clearData(
    command: CreateClassroomsStudentCommand
  ): CreateClassroomsStudentCommand {
    return cleanObject({
      name: cleanValue(command?.name),
      parent: cleanValue(command?.parent)
    });
  }
}
