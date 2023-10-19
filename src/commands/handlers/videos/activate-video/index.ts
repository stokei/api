import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { ActivateVideoCommand } from '@/commands/implements/videos/activate-video.command';
import { ActivateVideoRepositoryDataDTO } from '@/dtos/videos/activate-video-repository.dto';
import {
  DataNotFoundException,
  ParamNotFoundException,
  VideoNotFoundException
} from '@/errors';
import { VideoModel } from '@/models/video.model';
import { ActivateVideoRepository } from '@/repositories/videos/activate-video';
import { FindVideoByIdService } from '@/services/videos/find-video-by-id';

type ActivateVideoCommandKeys = keyof ActivateVideoCommand;

@CommandHandler(ActivateVideoCommand)
export class ActivateVideoCommandHandler
  implements ICommandHandler<ActivateVideoCommand>
{
  constructor(
    private readonly activateVideoRepository: ActivateVideoRepository,
    private readonly findVideoByIdService: FindVideoByIdService,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: ActivateVideoCommand) {
    try {
      const data = this.clearData(command);
      if (!data) {
        throw new DataNotFoundException();
      }
      if (!data?.video) {
        throw new ParamNotFoundException<ActivateVideoCommandKeys>('video');
      }
      const video = await this.findVideoByIdService.execute(data.video);
      if (!video) {
        throw new VideoNotFoundException();
      }

      const videoDataUpdated: ActivateVideoRepositoryDataDTO = {
        active: true,
        updatedBy: data.updatedBy
      };
      const updated = await this.activateVideoRepository.execute({
        data: videoDataUpdated,
        where: {
          app: video.app,
          video: splitServiceId(video.id).id
        }
      });
      if (!updated) {
        throw new VideoNotFoundException();
      }
      const videoUpdated = new VideoModel({
        ...video,
        ...videoDataUpdated
      });
      const videoModel = this.publisher.mergeObjectContext(videoUpdated);
      videoModel.videoActivated({
        updatedBy: data.updatedBy
      });
      videoModel.commit();

      return videoUpdated;
    } catch (error) {}
  }

  private clearData(command: ActivateVideoCommand): ActivateVideoCommand {
    return cleanObject({
      updatedBy: cleanValue(command?.updatedBy),
      app: cleanValue(command?.app),
      video: cleanValue(command?.video)
    });
  }
}
