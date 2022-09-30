import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { StartVideoEncodingCommand } from '@/commands/implements/videos/start-video-encoding.command';
import { StartVideoEncodingRepositoryDataDTO } from '@/dtos/videos/start-video-encoding-repository.dto';
import { VideoStatus } from '@/enums/video-status.enum';
import {
  DataNotFoundException,
  ParamNotFoundException,
  VideoNotFoundException
} from '@/errors';
import { VideoModel } from '@/models/video.model';
import { StartVideoEncodingRepository } from '@/repositories/videos/start-video-encoding';
import { QencodeCreateVideoEncodingService } from '@/services/qencode/qencode-create-video-encoding';
import { FindVideoByIdService } from '@/services/videos/find-video-by-id';

type StartVideoEncodingCommandKeys = keyof StartVideoEncodingCommand;

@CommandHandler(StartVideoEncodingCommand)
export class StartVideoEncodingCommandHandler
  implements ICommandHandler<StartVideoEncodingCommand>
{
  constructor(
    private readonly startVideoEncodingRepository: StartVideoEncodingRepository,
    private readonly findVideoByIdService: FindVideoByIdService,
    private readonly qencodeCreateVideoEncodingService: QencodeCreateVideoEncodingService,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: StartVideoEncodingCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.video) {
      throw new ParamNotFoundException<StartVideoEncodingCommandKeys>('video');
    }
    const video = await this.findVideoByIdService.execute(data.video);
    if (!video) {
      throw new VideoNotFoundException();
    }

    const taskQencodeVideo =
      await this.qencodeCreateVideoEncodingService.execute({
        video: {
          id: video.id,
          name: video.name,
          temporaryURL: video.temporaryURL
        }
      });
    if (!taskQencodeVideo) {
      throw new VideoNotFoundException();
    }

    const videoDataUpdated: StartVideoEncodingRepositoryDataDTO = {
      active: false,
      status: VideoStatus.ENCODING,
      updatedBy: data.updatedBy
    };
    const updated = await this.startVideoEncodingRepository.execute({
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
    videoModel.videoEncodingStarted({
      updatedBy: data.updatedBy
    });
    videoModel.commit();

    return videoUpdated;
  }

  private clearData(
    command: StartVideoEncodingCommand
  ): StartVideoEncodingCommand {
    return cleanObject({
      updatedBy: cleanValue(command?.updatedBy),
      app: cleanValue(command?.app),
      video: cleanValue(command?.video)
    });
  }
}
