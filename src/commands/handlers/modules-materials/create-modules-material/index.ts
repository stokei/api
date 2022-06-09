import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreateModulesMaterialCommand } from '@/commands/implements/modules-materials/create-modules-material.command';
import {
  DataNotFoundException,
  ModulesMaterialNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CreateModulesMaterialRepository } from '@/repositories/modules-materials/create-modules-material';

type CreateModulesMaterialCommandKeys = keyof CreateModulesMaterialCommand;

@CommandHandler(CreateModulesMaterialCommand)
export class CreateModulesMaterialCommandHandler
  implements ICommandHandler<CreateModulesMaterialCommand>
{
  constructor(
    private readonly createModulesMaterialRepository: CreateModulesMaterialRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateModulesMaterialCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.parent) {
      throw new ParamNotFoundException<CreateModulesMaterialCommandKeys>(
        'parent'
      );
    }

    const modulesMaterialCreated =
      await this.createModulesMaterialRepository.execute(data);
    if (!modulesMaterialCreated) {
      throw new ModulesMaterialNotFoundException();
    }
    const modulesMaterialModel = this.publisher.mergeObjectContext(
      modulesMaterialCreated
    );
    modulesMaterialModel.createdModulesMaterial();
    modulesMaterialModel.commit();

    return modulesMaterialCreated;
  }

  private clearData(
    command: CreateModulesMaterialCommand
  ): CreateModulesMaterialCommand {
    return cleanObject({
      name: cleanValue(command?.name),
      parent: cleanValue(command?.parent)
    });
  }
}
