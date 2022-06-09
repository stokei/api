import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { RemoveClassroomsEnrollmentCommand } from '@/commands/implements/classrooms-enrollments/remove-classrooms-enrollment.command';
import {
  ClassroomsEnrollmentNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindClassroomsEnrollmentByIdRepository } from '@/repositories/classrooms-enrollments/find-classrooms-enrollment-by-id';
import { RemoveClassroomsEnrollmentRepository } from '@/repositories/classrooms-enrollments/remove-classrooms-enrollment';

type RemoveClassroomsEnrollmentCommandKeys =
  keyof RemoveClassroomsEnrollmentCommand;

@CommandHandler(RemoveClassroomsEnrollmentCommand)
export class RemoveClassroomsEnrollmentCommandHandler
  implements ICommandHandler<RemoveClassroomsEnrollmentCommand>
{
  constructor(
    private readonly findClassroomsEnrollmentByIdRepository: FindClassroomsEnrollmentByIdRepository,
    private readonly removeClassroomsEnrollmentRepository: RemoveClassroomsEnrollmentRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemoveClassroomsEnrollmentCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    const classroomsEnrollmentId = splitServiceId(
      data.where?.classroomsEnrollmentId
    )?.id;
    if (!classroomsEnrollmentId) {
      throw new ParamNotFoundException('classroomsEnrollmentId');
    }

    const classroomsEnrollment =
      await this.findClassroomsEnrollmentByIdRepository.execute(
        classroomsEnrollmentId
      );
    if (!classroomsEnrollment) {
      throw new ClassroomsEnrollmentNotFoundException();
    }

    const removed = await this.removeClassroomsEnrollmentRepository.execute({
      where: {
        classroomsEnrollmentId
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const classroomsEnrollmentModel =
      this.publisher.mergeObjectContext(classroomsEnrollment);
    classroomsEnrollmentModel.removedClassroomsEnrollment();
    classroomsEnrollmentModel.commit();

    return classroomsEnrollment;
  }

  private clearData(
    command: RemoveClassroomsEnrollmentCommand
  ): RemoveClassroomsEnrollmentCommand {
    return cleanObject({
      where: cleanObject({
        classroomsEnrollmentId: cleanValue(
          command?.where?.classroomsEnrollmentId
        )
      })
    });
  }
}
