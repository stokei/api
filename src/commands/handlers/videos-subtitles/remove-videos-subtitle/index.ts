import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RemoveVideosSubtitleCommand } from '@/commands/implements/videos-subtitles/remove-videos-subtitle.command';
import {
  VideosSubtitleNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindVideosSubtitleByIdRepository } from '@/repositories/videos-subtitles/find-videos-subtitle-by-id';
import { RemoveVideosSubtitleRepository } from '@/repositories/videos-subtitles/remove-videos-subtitle';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

type RemoveVideosSubtitleCommandKeys = keyof RemoveVideosSubtitleCommand;

@CommandHandler(RemoveVideosSubtitleCommand)
export class RemoveVideosSubtitleCommandHandler
  implements ICommandHandler<RemoveVideosSubtitleCommand>
{
  constructor(
    private readonly findVideosSubtitleByIdRepository: FindVideosSubtitleByIdRepository,
    private readonly removeVideosSubtitleRepository: RemoveVideosSubtitleRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemoveVideosSubtitleCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    const videosSubtitleId = splitServiceId(data.where?.videosSubtitleId)?.id;
    if (!videosSubtitleId) {
      throw new ParamNotFoundException('videosSubtitleId');
    }

    const videosSubtitle = await this.findVideosSubtitleByIdRepository.execute(
      videosSubtitleId
    );
    if (!videosSubtitle) {
      throw new VideosSubtitleNotFoundException();
    }

    const removed = await this.removeVideosSubtitleRepository.execute({
      where: {
        videosSubtitleId
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const videosSubtitleModel =
      this.publisher.mergeObjectContext(videosSubtitle);
    videosSubtitleModel.removedVideosSubtitle();
    videosSubtitleModel.commit();

    return videosSubtitle;
  }

  private clearData(
    command: RemoveVideosSubtitleCommand
  ): RemoveVideosSubtitleCommand {
    return cleanObject({
      where: cleanObject({
        videosSubtitleId: cleanValue(command?.where?.videosSubtitleId)
      })
    });
  }
}
