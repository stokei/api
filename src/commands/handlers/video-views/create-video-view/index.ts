import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreateVideoViewCommand } from '@/commands/implements/video-views/create-video-view.command';
import {
  DataNotFoundException,
  ParamNotFoundException,
  VideoNotFoundException,
  VideoViewNotFoundException
} from '@/errors';
import { CreateVideoViewRepository } from '@/repositories/video-views/create-video-view';
import { FindFileByIdService } from '@/services/files/find-file-by-id';
import { FindVideoByIdService } from '@/services/videos/find-video-by-id';

type CreateVideoViewCommandKeys = keyof CreateVideoViewCommand;

@CommandHandler(CreateVideoViewCommand)
export class CreateVideoViewCommandHandler
  implements ICommandHandler<CreateVideoViewCommand>
{
  constructor(
    private readonly findFileByIdService: FindFileByIdService,
    private readonly findVideoByIdService: FindVideoByIdService,
    private readonly createVideoViewRepository: CreateVideoViewRepository
  ) {}

  async execute(command: CreateVideoViewCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.viewer) {
      throw new ParamNotFoundException<CreateVideoViewCommandKeys>('viewer');
    }
    if (!data?.video) {
      throw new ParamNotFoundException<CreateVideoViewCommandKeys>('video');
    }
    const video = await this.findVideoByIdService.execute(data.video);
    if (!video) {
      throw new VideoNotFoundException();
    }
    const videoFile = await this.findFileByIdService.execute(video.file);
    if (!videoFile) {
      throw new VideoNotFoundException();
    }
    const videoViewCreated = await this.createVideoViewRepository.execute({
      ...data,
      videoDuration: videoFile.duration,
      viewedDuration: 0
    });
    if (!videoViewCreated) {
      throw new VideoViewNotFoundException();
    }
    return videoViewCreated;
  }

  private clearData(command: CreateVideoViewCommand): CreateVideoViewCommand {
    return cleanObject({
      createdBy: cleanValue(command?.createdBy),
      app: cleanValue(command?.app),
      video: cleanValue(command?.video),
      viewer: cleanValue(command?.viewer)
    });
  }
}
