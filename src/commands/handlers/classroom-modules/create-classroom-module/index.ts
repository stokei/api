import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreateClassroomModuleCommand } from '@/commands/implements/classroom-modules/create-classroom-module.command';
import {
  ClassroomModuleNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CreateClassroomModuleRepository } from '@/repositories/classroom-modules/create-classroom-module';

type CreateClassroomModuleCommandKeys = keyof CreateClassroomModuleCommand;

@CommandHandler(CreateClassroomModuleCommand)
export class CreateClassroomModuleCommandHandler
  implements ICommandHandler<CreateClassroomModuleCommand>
{
  constructor(
    private readonly createClassroomModuleRepository: CreateClassroomModuleRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateClassroomModuleCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.classroom) {
      throw new ParamNotFoundException<CreateClassroomModuleCommandKeys>(
        'classroom'
      );
    }
    if (!data?.module) {
      throw new ParamNotFoundException<CreateClassroomModuleCommandKeys>(
        'module'
      );
    }

    const classroomModuleCreated =
      await this.createClassroomModuleRepository.execute(data);
    if (!classroomModuleCreated) {
      throw new ClassroomModuleNotFoundException();
    }
    const classroomModuleModel = this.publisher.mergeObjectContext(
      classroomModuleCreated
    );
    classroomModuleModel.createdClassroomModule({
      createdBy: data.createdBy
    });
    classroomModuleModel.commit();

    return classroomModuleCreated;
  }

  private clearData(
    command: CreateClassroomModuleCommand
  ): CreateClassroomModuleCommand {
    return cleanObject({
      createdBy: cleanValue(command?.createdBy),
      app: cleanValue(command?.app),
      module: cleanValue(command?.module),
      classroom: cleanValue(command?.classroom)
    });
  }
}
