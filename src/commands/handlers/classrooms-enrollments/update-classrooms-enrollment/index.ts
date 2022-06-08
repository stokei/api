import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UpdateClassroomsEnrollmentCommand } from '@/commands/implements/classrooms-enrollments/update-classrooms-enrollment.command';
import {
  ClassroomsEnrollmentNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindClassroomsEnrollmentByIdRepository } from '@/repositories/classrooms-enrollments/find-classrooms-enrollment-by-id';
import { UpdateClassroomsEnrollmentRepository } from '@/repositories/classrooms-enrollments/update-classrooms-enrollment';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

type UpdateClassroomsEnrollmentCommandKeys =
  keyof UpdateClassroomsEnrollmentCommand;

@CommandHandler(UpdateClassroomsEnrollmentCommand)
export class UpdateClassroomsEnrollmentCommandHandler
  implements ICommandHandler<UpdateClassroomsEnrollmentCommand>
{
  constructor(
    private readonly findClassroomsEnrollmentByIdRepository: FindClassroomsEnrollmentByIdRepository,
    private readonly updateClassroomsEnrollmentRepository: UpdateClassroomsEnrollmentRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdateClassroomsEnrollmentCommand) {
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

    const updated = await this.updateClassroomsEnrollmentRepository.execute({
      ...data,
      where: {
        ...data.where,
        classroomsEnrollmentId
      }
    });
    if (!updated) {
      throw new DataNotFoundException();
    }

    const classroomsEnrollmentUpdated =
      await this.findClassroomsEnrollmentByIdRepository.execute(
        classroomsEnrollmentId
      );
    if (!classroomsEnrollmentUpdated) {
      throw new ClassroomsEnrollmentNotFoundException();
    }
    const classroomsEnrollmentModel = this.publisher.mergeObjectContext(
      classroomsEnrollmentUpdated
    );
    classroomsEnrollmentModel.updatedClassroomsEnrollment();
    classroomsEnrollmentModel.commit();

    return classroomsEnrollmentUpdated;
  }

  private clearData(
    command: UpdateClassroomsEnrollmentCommand
  ): UpdateClassroomsEnrollmentCommand {
    return cleanObject({
      where: cleanObject({
        classroomsEnrollmentId: cleanValue(
          command?.where?.classroomsEnrollmentId
        )
      }),
      data: cleanObject({
        name: cleanValue(command?.data?.name)
      })
    });
  }
}
