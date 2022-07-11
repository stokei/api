import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { RemoveModuleVideoCommand } from '@/commands/implements/module-videos/remove-module-video.command';
import {
  DataNotFoundException,
  ModuleVideoNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindModuleVideoByIdRepository } from '@/repositories/module-videos/find-module-video-by-id';
import { RemoveModuleVideoRepository } from '@/repositories/module-videos/remove-module-video';

type RemoveModuleVideoCommandKeys = keyof RemoveModuleVideoCommand;

@CommandHandler(RemoveModuleVideoCommand)
export class RemoveModuleVideoCommandHandler
  implements ICommandHandler<RemoveModuleVideoCommand>
{
  constructor(
    private readonly findModuleVideoByIdRepository: FindModuleVideoByIdRepository,
    private readonly removeModuleVideoRepository: RemoveModuleVideoRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemoveModuleVideoCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data.where?.removedBy) {
      throw new ParamNotFoundException('removedBy');
    }
    const moduleVideoId = splitServiceId(data.where?.moduleVideoId)?.id;
    if (!moduleVideoId) {
      throw new ParamNotFoundException('moduleVideoId');
    }

    const moduleVideo = await this.findModuleVideoByIdRepository.execute(
      moduleVideoId
    );
    if (!moduleVideo) {
      throw new ModuleVideoNotFoundException();
    }

    const removed = await this.removeModuleVideoRepository.execute({
      where: {
        ...data.where,
        moduleVideoId
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const moduleVideoModel = this.publisher.mergeObjectContext(moduleVideo);
    moduleVideoModel.removedModuleVideo({
      removedBy: data.where.removedBy
    });
    moduleVideoModel.commit();

    return moduleVideo;
  }

  private clearData(
    command: RemoveModuleVideoCommand
  ): RemoveModuleVideoCommand {
    return cleanObject({
      where: cleanObject({
        removedBy: cleanValue(command?.where?.removedBy),
        moduleVideoId: cleanValue(command?.where?.moduleVideoId)
      })
    });
  }
}
