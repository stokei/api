import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { RemoveVideosMaterialCommand } from '@/commands/implements/videos-materials/remove-videos-material.command';
import {
  DataNotFoundException,
  ParamNotFoundException,
  VideosMaterialNotFoundException
} from '@/errors';
import { FindVideosMaterialByIdRepository } from '@/repositories/videos-materials/find-videos-material-by-id';
import { RemoveVideosMaterialRepository } from '@/repositories/videos-materials/remove-videos-material';

type RemoveVideosMaterialCommandKeys = keyof RemoveVideosMaterialCommand;

@CommandHandler(RemoveVideosMaterialCommand)
export class RemoveVideosMaterialCommandHandler
  implements ICommandHandler<RemoveVideosMaterialCommand>
{
  constructor(
    private readonly findVideosMaterialByIdRepository: FindVideosMaterialByIdRepository,
    private readonly removeVideosMaterialRepository: RemoveVideosMaterialRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemoveVideosMaterialCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    const videosMaterialId = splitServiceId(data.where?.videosMaterialId)?.id;
    if (!videosMaterialId) {
      throw new ParamNotFoundException('videosMaterialId');
    }

    const videosMaterial = await this.findVideosMaterialByIdRepository.execute(
      videosMaterialId
    );
    if (!videosMaterial) {
      throw new VideosMaterialNotFoundException();
    }

    const removed = await this.removeVideosMaterialRepository.execute({
      where: {
        videosMaterialId
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const videosMaterialModel =
      this.publisher.mergeObjectContext(videosMaterial);
    videosMaterialModel.removedVideosMaterial();
    videosMaterialModel.commit();

    return videosMaterial;
  }

  private clearData(
    command: RemoveVideosMaterialCommand
  ): RemoveVideosMaterialCommand {
    return cleanObject({
      where: cleanObject({
        videosMaterialId: cleanValue(command?.where?.videosMaterialId)
      })
    });
  }
}
