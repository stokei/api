import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { ActivateClassroomCommand } from '@/commands/implements/classrooms/activate-classroom.command';
import {
  ClassroomAlreadyActivateException,
  ClassroomNotFoundException,
  DataNotFoundException,
  ParamNotFoundException,
  UserUnauthorizedException
} from '@/errors';
import { ActivateClassroomRepository } from '@/repositories/classrooms/activate-classroom';
import { FindClassroomByIdService } from '@/services/classrooms/find-classroom-by-id';

@CommandHandler(ActivateClassroomCommand)
export class ActivateClassroomCommandHandler
  implements ICommandHandler<ActivateClassroomCommand>
{
  constructor(
    private readonly findClassroomByIdService: FindClassroomByIdService,
    private readonly removeClassroomRepository: ActivateClassroomRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: ActivateClassroomCommand) {
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
      throw new ClassroomAlreadyActivateException();
    }
    if (data.where?.updatedBy !== classroom.createdBy) {
      throw new UserUnauthorizedException();
    }

    const activated = await this.removeClassroomRepository.execute({
      where: {
        ...data.where,
        classroom: classroomId
      }
    });
    if (!activated) {
      throw new DataNotFoundException();
    }
    const classroomModel = this.publisher.mergeObjectContext(classroom);
    classroomModel.activatedClassroom({
      updatedBy: data.where.updatedBy
    });
    classroomModel.commit();

    return classroom;
  }

  private clearData(
    command: ActivateClassroomCommand
  ): ActivateClassroomCommand {
    return cleanObject({
      where: cleanObject({
        updatedBy: cleanValue(command?.where?.updatedBy),
        app: cleanValue(command?.where?.app),
        classroom: cleanValue(command?.where?.classroom)
      })
    });
  }
}
