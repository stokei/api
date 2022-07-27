import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { UpdateVideoCommand } from '@/commands/implements/videos/update-video.command';
import {
  DataNotFoundException,
  ParamNotFoundException,
  VideoNotFoundException
} from '@/errors';
import { FindVideoByIdRepository } from '@/repositories/videos/find-video-by-id';
import { UpdateVideoRepository } from '@/repositories/videos/update-video';

@CommandHandler(UpdateVideoCommand)
export class UpdateVideoCommandHandler
  implements ICommandHandler<UpdateVideoCommand>
{
  constructor(
    private readonly findVideoByIdRepository: FindVideoByIdRepository,
    private readonly updateVideoRepository: UpdateVideoRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdateVideoCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    const videoId = splitServiceId(data.where?.video)?.id;
    if (!videoId) {
      throw new ParamNotFoundException('videoId');
    }

    const video = await this.findVideoByIdRepository.execute(videoId);
    if (!video) {
      throw new VideoNotFoundException();
    }

    const updated = await this.updateVideoRepository.execute({
      ...data,
      where: {
        ...data.where,
        video: videoId
      }
    });
    if (!updated) {
      throw new DataNotFoundException();
    }

    const videoUpdated = await this.findVideoByIdRepository.execute(videoId);
    if (!videoUpdated) {
      throw new VideoNotFoundException();
    }
    const videoModel = this.publisher.mergeObjectContext(videoUpdated);
    videoModel.updatedVideo({
      updatedBy: data.data.updatedBy
    });
    videoModel.commit();

    return videoUpdated;
  }

  private clearData(command: UpdateVideoCommand): UpdateVideoCommand {
    return cleanObject({
      where: cleanObject({
        app: cleanValue(command?.where?.app),
        video: cleanValue(command?.where?.video)
      }),
      data: cleanObject({
        name: cleanValue(command?.data?.name),
        description: cleanValue(command?.data?.description),
        poster: cleanValue(command?.data?.poster),
        updatedBy: cleanValue(command?.data?.updatedBy)
      })
    });
  }
}
