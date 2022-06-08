import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateVideosSubtitleCommand } from '@/commands/implements/videos-subtitles/create-videos-subtitle.command';
import {
  VideosSubtitleNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CreateVideosSubtitleRepository } from '@/repositories/videos-subtitles/create-videos-subtitle';
import { cleanObject, cleanValue } from '@stokei/nestjs';

type CreateVideosSubtitleCommandKeys = keyof CreateVideosSubtitleCommand;

@CommandHandler(CreateVideosSubtitleCommand)
export class CreateVideosSubtitleCommandHandler
  implements ICommandHandler<CreateVideosSubtitleCommand>
{
  constructor(
    private readonly createVideosSubtitleRepository: CreateVideosSubtitleRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateVideosSubtitleCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.parent) {
      throw new ParamNotFoundException<CreateVideosSubtitleCommandKeys>(
        'parent'
      );
    }

    const videosSubtitleCreated =
      await this.createVideosSubtitleRepository.execute(data);
    if (!videosSubtitleCreated) {
      throw new VideosSubtitleNotFoundException();
    }
    const videosSubtitleModel = this.publisher.mergeObjectContext(
      videosSubtitleCreated
    );
    videosSubtitleModel.createdVideosSubtitle();
    videosSubtitleModel.commit();

    return videosSubtitleCreated;
  }

  private clearData(
    command: CreateVideosSubtitleCommand
  ): CreateVideosSubtitleCommand {
    return cleanObject({
      name: cleanValue(command?.name),
      parent: cleanValue(command?.parent)
    });
  }
}
