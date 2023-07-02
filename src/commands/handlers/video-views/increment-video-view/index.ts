import { Logger } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { IncrementVideoViewCommand } from '@/commands/implements/video-views/increment-video-view.command';
import {
  DataNotFoundException,
  ParamNotFoundException,
  VideoViewNotFoundException
} from '@/errors';
import { VideoViewIncrementedSuccessfullyEvent } from '@/events/implements/video-views/video-view-incremented-successfully.event';
import { IncrementVideoViewRepository } from '@/repositories/video-views/increment-video-view';
import { FindVideoViewByIdService } from '@/services/video-views/find-video-view-by-id';

type IncrementVideoViewCommandKeys = keyof IncrementVideoViewCommand;

@CommandHandler(IncrementVideoViewCommand)
export class IncrementVideoViewCommandHandler
  implements ICommandHandler<IncrementVideoViewCommand>
{
  private readonly logger = new Logger(IncrementVideoViewCommandHandler.name);
  constructor(
    private readonly findVideoViewByIdService: FindVideoViewByIdService,
    private readonly eventBus: EventBus,
    private readonly incrementVideoViewRepository: IncrementVideoViewRepository
  ) {}

  async execute(command: IncrementVideoViewCommand) {
    const data = this.clearData(command);
    try {
      if (!data) {
        throw new DataNotFoundException();
      }
      if (!data?.videoView) {
        throw new ParamNotFoundException<IncrementVideoViewCommandKeys>(
          'videoView'
        );
      }

      const videoView = await this.findVideoViewByIdService.execute(
        data.videoView
      );
      if (!videoView) {
        throw new VideoViewNotFoundException();
      }
      const incrementFiveSeconds = 5;
      const videoViewIncremented =
        await this.incrementVideoViewRepository.execute({
          ...data,
          videoView: splitServiceId(videoView.id)?.id,
          viewedDuration: incrementFiveSeconds
        });
      if (!videoViewIncremented) {
        throw new VideoViewNotFoundException();
      }
      await this.eventBus.publish(
        new VideoViewIncrementedSuccessfullyEvent({
          app: data.app,
          videoView: videoView.id,
          viewedDuration: incrementFiveSeconds,
          createdBy: data.createdBy
        })
      );
      return videoViewIncremented;
    } catch (error) {
      this.logger.error(`VideoView(#${data?.videoView}): ${error?.message}`);
      return;
    }
  }

  private clearData(
    command: IncrementVideoViewCommand
  ): IncrementVideoViewCommand {
    return cleanObject({
      createdBy: cleanValue(command?.createdBy),
      app: cleanValue(command?.app),
      videoView: cleanValue(command?.videoView)
    });
  }
}
