import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreateModuleVideoCommand } from '@/commands/implements/module-videos/create-module-video.command';
import {
  DataNotFoundException,
  ModuleVideoNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CreateModuleVideoRepository } from '@/repositories/module-videos/create-module-video';

type CreateModuleVideoCommandKeys = keyof CreateModuleVideoCommand;

@CommandHandler(CreateModuleVideoCommand)
export class CreateModuleVideoCommandHandler
  implements ICommandHandler<CreateModuleVideoCommand>
{
  constructor(
    private readonly createModuleVideoRepository: CreateModuleVideoRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateModuleVideoCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.parent) {
      throw new ParamNotFoundException<CreateModuleVideoCommandKeys>('parent');
    }

    const moduleVideoCreated = await this.createModuleVideoRepository.execute(
      data
    );
    if (!moduleVideoCreated) {
      throw new ModuleVideoNotFoundException();
    }
    const moduleVideoModel =
      this.publisher.mergeObjectContext(moduleVideoCreated);
    moduleVideoModel.createdModuleVideo({
      createdBy: data.createdBy
    });
    moduleVideoModel.commit();

    return moduleVideoCreated;
  }

  private clearData(
    command: CreateModuleVideoCommand
  ): CreateModuleVideoCommand {
    return cleanObject({
      name: cleanValue(command?.name),
      parent: cleanValue(command?.parent)
    });
  }
}
