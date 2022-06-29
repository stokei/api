import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { UpdateClassroomCommand } from '@/commands/implements/classrooms/update-classroom.command';
import {
  ClassroomNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindClassroomByIdRepository } from '@/repositories/classrooms/find-classroom-by-id';
import { UpdateClassroomRepository } from '@/repositories/classrooms/update-classroom';

type UpdateClassroomCommandKeys = keyof UpdateClassroomCommand;

@CommandHandler(UpdateClassroomCommand)
export class UpdateClassroomCommandHandler
  implements ICommandHandler<UpdateClassroomCommand>
{
  constructor(
    private readonly findClassroomByIdRepository: FindClassroomByIdRepository,
    private readonly updateClassroomRepository: UpdateClassroomRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdateClassroomCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    const classroomId = splitServiceId(data.where?.classroomId)?.id;
    if (!classroomId) {
      throw new ParamNotFoundException('classroomId');
    }

    const classroom = await this.findClassroomByIdRepository.execute(
      classroomId
    );
    if (!classroom) {
      throw new ClassroomNotFoundException();
    }

    const updated = await this.updateClassroomRepository.execute({
      ...data,
      where: {
        ...data.where,
        classroomId
      }
    });
    if (!updated) {
      throw new DataNotFoundException();
    }

    const classroomUpdated = await this.findClassroomByIdRepository.execute(
      classroomId
    );
    if (!classroomUpdated) {
      throw new ClassroomNotFoundException();
    }
    const classroomModel = this.publisher.mergeObjectContext(classroomUpdated);
    classroomModel.updatedClassroom();
    classroomModel.commit();

    return classroomUpdated;
  }

  private clearData(command: UpdateClassroomCommand): UpdateClassroomCommand {
    return cleanObject({
      where: cleanObject({
        classroomId: cleanValue(command?.where?.classroomId)
      }),
      data: cleanObject({
        name: cleanValue(command?.data?.name),
        updatedBy: cleanValue(command?.data?.updatedBy)
      })
    });
  }
}
