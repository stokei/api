import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { UpdateClassroomStudentCommand } from '@/commands/implements/classroom-students/update-classroom-student.command';
import {
  ClassroomStudentNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindClassroomStudentByIdRepository } from '@/repositories/classroom-students/find-classroom-student-by-id';
import { UpdateClassroomStudentRepository } from '@/repositories/classroom-students/update-classroom-student';

type UpdateClassroomStudentCommandKeys = keyof UpdateClassroomStudentCommand;

@CommandHandler(UpdateClassroomStudentCommand)
export class UpdateClassroomStudentCommandHandler
  implements ICommandHandler<UpdateClassroomStudentCommand>
{
  constructor(
    private readonly findClassroomStudentByIdRepository: FindClassroomStudentByIdRepository,
    private readonly updateClassroomStudentRepository: UpdateClassroomStudentRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdateClassroomStudentCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    const classroomStudentId = splitServiceId(
      data.where?.classroomStudentId
    )?.id;
    if (!classroomStudentId) {
      throw new ParamNotFoundException('classroomStudentId');
    }

    const classroomStudent =
      await this.findClassroomStudentByIdRepository.execute(classroomStudentId);
    if (!classroomStudent) {
      throw new ClassroomStudentNotFoundException();
    }

    const updated = await this.updateClassroomStudentRepository.execute({
      ...data,
      where: {
        ...data.where,
        classroomStudentId
      }
    });
    if (!updated) {
      throw new DataNotFoundException();
    }

    const classroomStudentUpdated =
      await this.findClassroomStudentByIdRepository.execute(classroomStudentId);
    if (!classroomStudentUpdated) {
      throw new ClassroomStudentNotFoundException();
    }
    const classroomStudentModel = this.publisher.mergeObjectContext(
      classroomStudentUpdated
    );
    classroomStudentModel.updatedClassroomStudent({
      updatedBy: data.data.updatedBy
    });
    classroomStudentModel.commit();

    return classroomStudentUpdated;
  }

  private clearData(
    command: UpdateClassroomStudentCommand
  ): UpdateClassroomStudentCommand {
    return cleanObject({
      where: cleanObject({
        classroomStudentId: cleanValue(command?.where?.classroomStudentId)
      }),
      data: cleanObject({
        name: cleanValue(command?.data?.name),
        updatedBy: cleanValue(command?.data?.updatedBy)
      })
    });
  }
}
