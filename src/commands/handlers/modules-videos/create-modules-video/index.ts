import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreateModulesVideoCommand } from '@/commands/implements/modules-videos/create-modules-video.command';
import {
  DataNotFoundException,
  ModulesVideoNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CreateModulesVideoRepository } from '@/repositories/modules-videos/create-modules-video';

type CreateModulesVideoCommandKeys = keyof CreateModulesVideoCommand;

@CommandHandler(CreateModulesVideoCommand)
export class CreateModulesVideoCommandHandler
  implements ICommandHandler<CreateModulesVideoCommand>
{
  constructor(
    private readonly createModulesVideoRepository: CreateModulesVideoRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateModulesVideoCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.parent) {
      throw new ParamNotFoundException<CreateModulesVideoCommandKeys>('parent');
    }

    const modulesVideoCreated = await this.createModulesVideoRepository.execute(
      data
    );
    if (!modulesVideoCreated) {
      throw new ModulesVideoNotFoundException();
    }
    const modulesVideoModel =
      this.publisher.mergeObjectContext(modulesVideoCreated);
    modulesVideoModel.createdModulesVideo();
    modulesVideoModel.commit();

    return modulesVideoCreated;
  }

  private clearData(
    command: CreateModulesVideoCommand
  ): CreateModulesVideoCommand {
    return cleanObject({
      name: cleanValue(command?.name),
      parent: cleanValue(command?.parent)
    });
  }
}
