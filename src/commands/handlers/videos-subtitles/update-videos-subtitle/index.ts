import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UpdateVideosSubtitleCommand } from '@/commands/implements/videos-subtitles/update-videos-subtitle.command';
import {
  VideosSubtitleNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindVideosSubtitleByIdRepository } from '@/repositories/videos-subtitles/find-videos-subtitle-by-id';
import { UpdateVideosSubtitleRepository } from '@/repositories/videos-subtitles/update-videos-subtitle';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

type UpdateVideosSubtitleCommandKeys = keyof UpdateVideosSubtitleCommand;

@CommandHandler(UpdateVideosSubtitleCommand)
export class UpdateVideosSubtitleCommandHandler
  implements ICommandHandler<UpdateVideosSubtitleCommand>
{
  constructor(
    private readonly findVideosSubtitleByIdRepository: FindVideosSubtitleByIdRepository,
    private readonly updateVideosSubtitleRepository: UpdateVideosSubtitleRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdateVideosSubtitleCommand) {
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

    const updated = await this.updateVideosSubtitleRepository.execute({
      ...data,
      where: {
        ...data.where,
        videosSubtitleId
      }
    });
    if (!updated) {
      throw new DataNotFoundException();
    }

    const videosSubtitleUpdated =
      await this.findVideosSubtitleByIdRepository.execute(videosSubtitleId);
    if (!videosSubtitleUpdated) {
      throw new VideosSubtitleNotFoundException();
    }
    const videosSubtitleModel = this.publisher.mergeObjectContext(
      videosSubtitleUpdated
    );
    videosSubtitleModel.updatedVideosSubtitle();
    videosSubtitleModel.commit();

    return videosSubtitleUpdated;
  }

  private clearData(
    command: UpdateVideosSubtitleCommand
  ): UpdateVideosSubtitleCommand {
    return cleanObject({
      where: cleanObject({
        videosSubtitleId: cleanValue(command?.where?.videosSubtitleId)
      }),
      data: cleanObject({
        name: cleanValue(command?.data?.name)
      })
    });
  }
}
