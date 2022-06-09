import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreateClassroomsEnrollmentCommand } from '@/commands/implements/classrooms-enrollments/create-classrooms-enrollment.command';
import {
  ClassroomsEnrollmentNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CreateClassroomsEnrollmentRepository } from '@/repositories/classrooms-enrollments/create-classrooms-enrollment';

type CreateClassroomsEnrollmentCommandKeys =
  keyof CreateClassroomsEnrollmentCommand;

@CommandHandler(CreateClassroomsEnrollmentCommand)
export class CreateClassroomsEnrollmentCommandHandler
  implements ICommandHandler<CreateClassroomsEnrollmentCommand>
{
  constructor(
    private readonly createClassroomsEnrollmentRepository: CreateClassroomsEnrollmentRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateClassroomsEnrollmentCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.parent) {
      throw new ParamNotFoundException<CreateClassroomsEnrollmentCommandKeys>(
        'parent'
      );
    }

    const classroomsEnrollmentCreated =
      await this.createClassroomsEnrollmentRepository.execute(data);
    if (!classroomsEnrollmentCreated) {
      throw new ClassroomsEnrollmentNotFoundException();
    }
    const classroomsEnrollmentModel = this.publisher.mergeObjectContext(
      classroomsEnrollmentCreated
    );
    classroomsEnrollmentModel.createdClassroomsEnrollment();
    classroomsEnrollmentModel.commit();

    return classroomsEnrollmentCreated;
  }

  private clearData(
    command: CreateClassroomsEnrollmentCommand
  ): CreateClassroomsEnrollmentCommand {
    return cleanObject({
      name: cleanValue(command?.name),
      parent: cleanValue(command?.parent)
    });
  }
}
