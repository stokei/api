import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { RemoveModuleCommand } from '@/commands/implements/modules/remove-module.command';
import {
  DataNotFoundException,
  ModuleNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindModuleByIdRepository } from '@/repositories/modules/find-module-by-id';
import { RemoveModuleRepository } from '@/repositories/modules/remove-module';

@CommandHandler(RemoveModuleCommand)
export class RemoveModuleCommandHandler
  implements ICommandHandler<RemoveModuleCommand>
{
  constructor(
    private readonly findModuleByIdRepository: FindModuleByIdRepository,
    private readonly removeModuleRepository: RemoveModuleRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemoveModuleCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data.where?.removedBy) {
      throw new ParamNotFoundException('removedBy');
    }
    const moduleId = splitServiceId(data.where?.module)?.id;
    if (!moduleId) {
      throw new ParamNotFoundException('moduleId');
    }

    const module = await this.findModuleByIdRepository.execute(moduleId);
    if (!module) {
      throw new ModuleNotFoundException();
    }

    const removed = await this.removeModuleRepository.execute({
      where: {
        ...data.where,
        module: moduleId
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const moduleModel = this.publisher.mergeObjectContext(module);
    moduleModel.removedModule({
      removedBy: data.where.removedBy
    });
    moduleModel.commit();

    return module;
  }

  private clearData(command: RemoveModuleCommand): RemoveModuleCommand {
    return cleanObject({
      where: cleanObject({
        removedBy: cleanValue(command?.where?.removedBy),
        app: cleanValue(command?.where?.app),
        module: cleanValue(command?.where?.module)
      })
    });
  }
}
