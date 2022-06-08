import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RemoveVideosTagCommand } from '@/commands/implements/videos-tags/remove-videos-tag.command';
import {
  VideosTagNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindVideosTagByIdRepository } from '@/repositories/videos-tags/find-videos-tag-by-id';
import { RemoveVideosTagRepository } from '@/repositories/videos-tags/remove-videos-tag';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

type RemoveVideosTagCommandKeys = keyof RemoveVideosTagCommand;

@CommandHandler(RemoveVideosTagCommand)
export class RemoveVideosTagCommandHandler
  implements ICommandHandler<RemoveVideosTagCommand>
{
  constructor(
    private readonly findVideosTagByIdRepository: FindVideosTagByIdRepository,
    private readonly removeVideosTagRepository: RemoveVideosTagRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemoveVideosTagCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    const videosTagId = splitServiceId(data.where?.videosTagId)?.id;
    if (!videosTagId) {
      throw new ParamNotFoundException('videosTagId');
    }

    const videosTag = await this.findVideosTagByIdRepository.execute(
      videosTagId
    );
    if (!videosTag) {
      throw new VideosTagNotFoundException();
    }

    const removed = await this.removeVideosTagRepository.execute({
      where: {
        videosTagId
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const videosTagModel = this.publisher.mergeObjectContext(videosTag);
    videosTagModel.removedVideosTag();
    videosTagModel.commit();

    return videosTag;
  }

  private clearData(command: RemoveVideosTagCommand): RemoveVideosTagCommand {
    return cleanObject({
      where: cleanObject({
        videosTagId: cleanValue(command?.where?.videosTagId)
      })
    });
  }
}
