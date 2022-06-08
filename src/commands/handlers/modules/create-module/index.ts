import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateModuleCommand } from '@/commands/implements/modules/create-module.command';
import {
  ModuleNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CreateModuleRepository } from '@/repositories/modules/create-module';
import { cleanObject, cleanValue } from '@stokei/nestjs';

type CreateModuleCommandKeys = keyof CreateModuleCommand;

@CommandHandler(CreateModuleCommand)
export class CreateModuleCommandHandler
  implements ICommandHandler<CreateModuleCommand>
{
  constructor(
    private readonly createModuleRepository: CreateModuleRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateModuleCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.parent) {
      throw new ParamNotFoundException<CreateModuleCommandKeys>('parent');
    }

    const moduleCreated = await this.createModuleRepository.execute(data);
    if (!moduleCreated) {
      throw new ModuleNotFoundException();
    }
    const moduleModel = this.publisher.mergeObjectContext(moduleCreated);
    moduleModel.createdModule();
    moduleModel.commit();

    return moduleCreated;
  }

  private clearData(command: CreateModuleCommand): CreateModuleCommand {
    return cleanObject({
      name: cleanValue(command?.name),
      parent: cleanValue(command?.parent)
    });
  }
}
