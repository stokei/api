import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { RemoveModulesVideoCommand } from '@/commands/implements/modules-videos/remove-modules-video.command';
import {
  DataNotFoundException,
  ModulesVideoNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindModulesVideoByIdRepository } from '@/repositories/modules-videos/find-modules-video-by-id';
import { RemoveModulesVideoRepository } from '@/repositories/modules-videos/remove-modules-video';

type RemoveModulesVideoCommandKeys = keyof RemoveModulesVideoCommand;

@CommandHandler(RemoveModulesVideoCommand)
export class RemoveModulesVideoCommandHandler
  implements ICommandHandler<RemoveModulesVideoCommand>
{
  constructor(
    private readonly findModulesVideoByIdRepository: FindModulesVideoByIdRepository,
    private readonly removeModulesVideoRepository: RemoveModulesVideoRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemoveModulesVideoCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data.where?.removedBy) {
      throw new ParamNotFoundException('removedBy');
    }
    const modulesVideoId = splitServiceId(data.where?.modulesVideoId)?.id;
    if (!modulesVideoId) {
      throw new ParamNotFoundException('modulesVideoId');
    }

    const modulesVideo = await this.findModulesVideoByIdRepository.execute(
      modulesVideoId
    );
    if (!modulesVideo) {
      throw new ModulesVideoNotFoundException();
    }

    const removed = await this.removeModulesVideoRepository.execute({
      where: {
        ...data.where,
        modulesVideoId
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const modulesVideoModel = this.publisher.mergeObjectContext(modulesVideo);
    modulesVideoModel.removedModulesVideo();
    modulesVideoModel.commit();

    return modulesVideo;
  }

  private clearData(
    command: RemoveModulesVideoCommand
  ): RemoveModulesVideoCommand {
    return cleanObject({
      where: cleanObject({
        removedBy: cleanValue(command?.where?.removedBy),
        modulesVideoId: cleanValue(command?.where?.modulesVideoId)
      })
    });
  }
}
