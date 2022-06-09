import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { UpdateModuleCommand } from '@/commands/implements/modules/update-module.command';
import {
  DataNotFoundException,
  ModuleNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindModuleByIdRepository } from '@/repositories/modules/find-module-by-id';
import { UpdateModuleRepository } from '@/repositories/modules/update-module';

type UpdateModuleCommandKeys = keyof UpdateModuleCommand;

@CommandHandler(UpdateModuleCommand)
export class UpdateModuleCommandHandler
  implements ICommandHandler<UpdateModuleCommand>
{
  constructor(
    private readonly findModuleByIdRepository: FindModuleByIdRepository,
    private readonly updateModuleRepository: UpdateModuleRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdateModuleCommand) {
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

    const updated = await this.updateModuleRepository.execute({
      ...data,
      where: {
        ...data.where,
        moduleId
      }
    });
    if (!updated) {
      throw new DataNotFoundException();
    }

    const moduleUpdated = await this.findModuleByIdRepository.execute(moduleId);
    if (!moduleUpdated) {
      throw new ModuleNotFoundException();
    }
    const moduleModel = this.publisher.mergeObjectContext(moduleUpdated);
    moduleModel.updatedModule();
    moduleModel.commit();

    return moduleUpdated;
  }

  private clearData(command: UpdateModuleCommand): UpdateModuleCommand {
    return cleanObject({
      where: cleanObject({
        moduleId: cleanValue(command?.where?.moduleId)
      }),
      data: cleanObject({
        name: cleanValue(command?.data?.name)
      })
    });
  }
}
