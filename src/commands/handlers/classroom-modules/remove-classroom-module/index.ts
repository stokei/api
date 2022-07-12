import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { RemoveClassroomModuleCommand } from '@/commands/implements/classroom-modules/remove-classroom-module.command';
import {
  ClassroomModuleNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindClassroomModuleByIdRepository } from '@/repositories/classroom-modules/find-classroom-module-by-id';
import { RemoveClassroomModuleRepository } from '@/repositories/classroom-modules/remove-classroom-module';

type RemoveClassroomModuleCommandKeys = keyof RemoveClassroomModuleCommand;

@CommandHandler(RemoveClassroomModuleCommand)
export class RemoveClassroomModuleCommandHandler
  implements ICommandHandler<RemoveClassroomModuleCommand>
{
  constructor(
    private readonly findClassroomModuleByIdRepository: FindClassroomModuleByIdRepository,
    private readonly removeClassroomModuleRepository: RemoveClassroomModuleRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemoveClassroomModuleCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data.where?.removedBy) {
      throw new ParamNotFoundException('removedBy');
    }
    const classroomModuleId = splitServiceId(data.where?.classroomModuleId)?.id;
    if (!classroomModuleId) {
      throw new ParamNotFoundException('classroomModuleId');
    }

    const classroomModule =
      await this.findClassroomModuleByIdRepository.execute(classroomModuleId);
    if (!classroomModule) {
      throw new ClassroomModuleNotFoundException();
    }

    const removed = await this.removeClassroomModuleRepository.execute({
      where: {
        ...data.where,
        classroomModuleId
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const classroomModuleModel =
      this.publisher.mergeObjectContext(classroomModule);
    classroomModuleModel.removedClassroomModule({
      removedBy: data.where.removedBy
    });
    classroomModuleModel.commit();

    return classroomModule;
  }

  private clearData(
    command: RemoveClassroomModuleCommand
  ): RemoveClassroomModuleCommand {
    return cleanObject({
      where: cleanObject({
        removedBy: cleanValue(command?.where?.removedBy),
        classroomModuleId: cleanValue(command?.where?.classroomModuleId)
      })
    });
  }
}
