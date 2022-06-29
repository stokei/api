import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { RemoveVideoCommand } from '@/commands/implements/videos/remove-video.command';
import {
  DataNotFoundException,
  ParamNotFoundException,
  VideoNotFoundException
} from '@/errors';
import { FindVideoByIdRepository } from '@/repositories/videos/find-video-by-id';
import { RemoveVideoRepository } from '@/repositories/videos/remove-video';

type RemoveVideoCommandKeys = keyof RemoveVideoCommand;

@CommandHandler(RemoveVideoCommand)
export class RemoveVideoCommandHandler
  implements ICommandHandler<RemoveVideoCommand>
{
  constructor(
    private readonly findVideoByIdRepository: FindVideoByIdRepository,
    private readonly removeVideoRepository: RemoveVideoRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemoveVideoCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data.where?.removedBy) {
      throw new ParamNotFoundException('removedBy');
    }
    const videoId = splitServiceId(data.where?.videoId)?.id;
    if (!videoId) {
      throw new ParamNotFoundException('videoId');
    }

    const video = await this.findVideoByIdRepository.execute(videoId);
    if (!video) {
      throw new VideoNotFoundException();
    }

    const removed = await this.removeVideoRepository.execute({
      where: {
        ...data.where,
        videoId
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const videoModel = this.publisher.mergeObjectContext(video);
    videoModel.removedVideo({
      removedBy: data.where.removedBy
    });
    videoModel.commit();

    return video;
  }

  private clearData(command: RemoveVideoCommand): RemoveVideoCommand {
    return cleanObject({
      where: cleanObject({
        removedBy: cleanValue(command?.where?.removedBy),
        videoId: cleanValue(command?.where?.videoId)
      })
    });
  }
}
