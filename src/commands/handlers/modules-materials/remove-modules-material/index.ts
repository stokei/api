import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RemoveModulesMaterialCommand } from '@/commands/implements/modules-materials/remove-modules-material.command';
import {
  ModulesMaterialNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindModulesMaterialByIdRepository } from '@/repositories/modules-materials/find-modules-material-by-id';
import { RemoveModulesMaterialRepository } from '@/repositories/modules-materials/remove-modules-material';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

type RemoveModulesMaterialCommandKeys = keyof RemoveModulesMaterialCommand;

@CommandHandler(RemoveModulesMaterialCommand)
export class RemoveModulesMaterialCommandHandler
  implements ICommandHandler<RemoveModulesMaterialCommand>
{
  constructor(
    private readonly findModulesMaterialByIdRepository: FindModulesMaterialByIdRepository,
    private readonly removeModulesMaterialRepository: RemoveModulesMaterialRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemoveModulesMaterialCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    const modulesMaterialId = splitServiceId(data.where?.modulesMaterialId)?.id;
    if (!modulesMaterialId) {
      throw new ParamNotFoundException('modulesMaterialId');
    }

    const modulesMaterial =
      await this.findModulesMaterialByIdRepository.execute(modulesMaterialId);
    if (!modulesMaterial) {
      throw new ModulesMaterialNotFoundException();
    }

    const removed = await this.removeModulesMaterialRepository.execute({
      where: {
        modulesMaterialId
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const modulesMaterialModel =
      this.publisher.mergeObjectContext(modulesMaterial);
    modulesMaterialModel.removedModulesMaterial();
    modulesMaterialModel.commit();

    return modulesMaterial;
  }

  private clearData(
    command: RemoveModulesMaterialCommand
  ): RemoveModulesMaterialCommand {
    return cleanObject({
      where: cleanObject({
        modulesMaterialId: cleanValue(command?.where?.modulesMaterialId)
      })
    });
  }
}
