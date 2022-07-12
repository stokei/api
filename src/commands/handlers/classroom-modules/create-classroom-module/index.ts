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
    if (!data?.parent) {
      throw new ParamNotFoundException<CreateClassroomModuleCommandKeys>(
        'parent'
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
      name: cleanValue(command?.name),
      parent: cleanValue(command?.parent)
    });
  }
}
