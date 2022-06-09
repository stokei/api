import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { UpdateClassroomsStudentCommand } from '@/commands/implements/classrooms-students/update-classrooms-student.command';
import {
  ClassroomsStudentNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindClassroomsStudentByIdRepository } from '@/repositories/classrooms-students/find-classrooms-student-by-id';
import { UpdateClassroomsStudentRepository } from '@/repositories/classrooms-students/update-classrooms-student';

type UpdateClassroomsStudentCommandKeys = keyof UpdateClassroomsStudentCommand;

@CommandHandler(UpdateClassroomsStudentCommand)
export class UpdateClassroomsStudentCommandHandler
  implements ICommandHandler<UpdateClassroomsStudentCommand>
{
  constructor(
    private readonly findClassroomsStudentByIdRepository: FindClassroomsStudentByIdRepository,
    private readonly updateClassroomsStudentRepository: UpdateClassroomsStudentRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdateClassroomsStudentCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    const classroomsStudentId = splitServiceId(
      data.where?.classroomsStudentId
    )?.id;
    if (!classroomsStudentId) {
      throw new ParamNotFoundException('classroomsStudentId');
    }

    const classroomsStudent =
      await this.findClassroomsStudentByIdRepository.execute(
        classroomsStudentId
      );
    if (!classroomsStudent) {
      throw new ClassroomsStudentNotFoundException();
    }

    const updated = await this.updateClassroomsStudentRepository.execute({
      ...data,
      where: {
        ...data.where,
        classroomsStudentId
      }
    });
    if (!updated) {
      throw new DataNotFoundException();
    }

    const classroomsStudentUpdated =
      await this.findClassroomsStudentByIdRepository.execute(
        classroomsStudentId
      );
    if (!classroomsStudentUpdated) {
      throw new ClassroomsStudentNotFoundException();
    }
    const classroomsStudentModel = this.publisher.mergeObjectContext(
      classroomsStudentUpdated
    );
    classroomsStudentModel.updatedClassroomsStudent();
    classroomsStudentModel.commit();

    return classroomsStudentUpdated;
  }

  private clearData(
    command: UpdateClassroomsStudentCommand
  ): UpdateClassroomsStudentCommand {
    return cleanObject({
      where: cleanObject({
        classroomsStudentId: cleanValue(command?.where?.classroomsStudentId)
      }),
      data: cleanObject({
        name: cleanValue(command?.data?.name)
      })
    });
  }
}
