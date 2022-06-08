import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UpdateModulesMaterialCommand } from '@/commands/implements/modules-materials/update-modules-material.command';
import {
  ModulesMaterialNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindModulesMaterialByIdRepository } from '@/repositories/modules-materials/find-modules-material-by-id';
import { UpdateModulesMaterialRepository } from '@/repositories/modules-materials/update-modules-material';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

type UpdateModulesMaterialCommandKeys = keyof UpdateModulesMaterialCommand;

@CommandHandler(UpdateModulesMaterialCommand)
export class UpdateModulesMaterialCommandHandler
  implements ICommandHandler<UpdateModulesMaterialCommand>
{
  constructor(
    private readonly findModulesMaterialByIdRepository: FindModulesMaterialByIdRepository,
    private readonly updateModulesMaterialRepository: UpdateModulesMaterialRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdateModulesMaterialCommand) {
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

    const updated = await this.updateModulesMaterialRepository.execute({
      ...data,
      where: {
        ...data.where,
        modulesMaterialId
      }
    });
    if (!updated) {
      throw new DataNotFoundException();
    }

    const modulesMaterialUpdated =
      await this.findModulesMaterialByIdRepository.execute(modulesMaterialId);
    if (!modulesMaterialUpdated) {
      throw new ModulesMaterialNotFoundException();
    }
    const modulesMaterialModel = this.publisher.mergeObjectContext(
      modulesMaterialUpdated
    );
    modulesMaterialModel.updatedModulesMaterial();
    modulesMaterialModel.commit();

    return modulesMaterialUpdated;
  }

  private clearData(
    command: UpdateModulesMaterialCommand
  ): UpdateModulesMaterialCommand {
    return cleanObject({
      where: cleanObject({
        modulesMaterialId: cleanValue(command?.where?.modulesMaterialId)
      }),
      data: cleanObject({
        name: cleanValue(command?.data?.name)
      })
    });
  }
}
