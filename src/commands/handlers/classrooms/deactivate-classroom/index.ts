import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { DeactivateClassroomCommand } from '@/commands/implements/classrooms/deactivate-classroom.command';
import {
  ClassroomAlreadyDeactivateException,
  ClassroomNotFoundException,
  DataNotFoundException,
  ParamNotFoundException,
  UserUnauthorizedException
} from '@/errors';
import { DeactivateClassroomRepository } from '@/repositories/classrooms/deactivate-classroom';
import { FindClassroomByIdService } from '@/services/classrooms/find-classroom-by-id';

@CommandHandler(DeactivateClassroomCommand)
export class DeactivateClassroomCommandHandler
  implements ICommandHandler<DeactivateClassroomCommand>
{
  constructor(
    private readonly findClassroomByIdService: FindClassroomByIdService,
    private readonly removeClassroomRepository: DeactivateClassroomRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: DeactivateClassroomCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data.where?.updatedBy) {
      throw new ParamNotFoundException('updatedBy');
    }
    const classroomId = data.where?.classroom;
    if (!classroomId) {
      throw new ParamNotFoundException('classroomId');
    }

    const classroom = await this.findClassroomByIdService.execute(classroomId);
    if (!classroom) {
      throw new ClassroomNotFoundException();
    }
    if (!classroom.active) {
      throw new ClassroomAlreadyDeactivateException();
    }
    if (data.where?.updatedBy !== classroom.createdBy) {
      throw new UserUnauthorizedException();
    }

    const deactivated = await this.removeClassroomRepository.execute({
      where: {
        ...data.where,
        classroom: classroomId
      }
    });
    if (!deactivated) {
      throw new DataNotFoundException();
    }
    const classroomModel = this.publisher.mergeObjectContext(classroom);
    classroomModel.deactivatedClassroom({
      updatedBy: data.where.updatedBy
    });
    classroomModel.commit();

    return classroom;
  }

  private clearData(
    command: DeactivateClassroomCommand
  ): DeactivateClassroomCommand {
    return cleanObject({
      where: cleanObject({
        updatedBy: cleanValue(command?.where?.updatedBy),
        app: cleanValue(command?.where?.app),
        classroom: cleanValue(command?.where?.classroom)
      })
    });
  }
}
