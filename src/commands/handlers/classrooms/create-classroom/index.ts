import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, cleanValueBoolean } from '@stokei/nestjs';

import { CreateClassroomCommand } from '@/commands/implements/classrooms/create-classroom.command';
import {
  ClassroomNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CreateClassroomRepository } from '@/repositories/classrooms/create-classroom';

type CreateClassroomCommandKeys = keyof CreateClassroomCommand;

@CommandHandler(CreateClassroomCommand)
export class CreateClassroomCommandHandler
  implements ICommandHandler<CreateClassroomCommand>
{
  constructor(
    private readonly createClassroomRepository: CreateClassroomRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateClassroomCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.parent) {
      throw new ParamNotFoundException<CreateClassroomCommandKeys>('parent');
    }
    if (!data?.name) {
      throw new ParamNotFoundException<CreateClassroomCommandKeys>('name');
    }

    const classroomCreated = await this.createClassroomRepository.execute(data);
    if (!classroomCreated) {
      throw new ClassroomNotFoundException();
    }
    const classroomModel = this.publisher.mergeObjectContext(classroomCreated);
    classroomModel.createdClassroom({
      createdBy: data.createdBy
    });
    classroomModel.commit();

    return classroomCreated;
  }

  private clearData(command: CreateClassroomCommand): CreateClassroomCommand {
    return cleanObject({
      createdBy: cleanValue(command?.createdBy),
      parent: cleanValue(command?.parent),
      app: cleanValue(command?.app),
      name: cleanValue(command?.name),
      description: cleanValue(command?.description),
      hasAccessToAllModules: cleanValueBoolean(command?.hasAccessToAllModules)
    });
  }
}
