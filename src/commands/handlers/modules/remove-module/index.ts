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

type RemoveModuleCommandKeys = keyof RemoveModuleCommand;

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
    const moduleId = splitServiceId(data.where?.moduleId)?.id;
    if (!moduleId) {
      throw new ParamNotFoundException('moduleId');
    }

    const module = await this.findModuleByIdRepository.execute(moduleId);
    if (!module) {
      throw new ModuleNotFoundException();
    }

    const removed = await this.removeModuleRepository.execute({
      where: {
        moduleId
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const moduleModel = this.publisher.mergeObjectContext(module);
    moduleModel.removedModule();
    moduleModel.commit();

    return module;
  }

  private clearData(command: RemoveModuleCommand): RemoveModuleCommand {
    return cleanObject({
      where: cleanObject({
        moduleId: cleanValue(command?.where?.moduleId)
      })
    });
  }
}
