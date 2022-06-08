import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RemoveVideosAuthorCommand } from '@/commands/implements/videos-authors/remove-videos-author.command';
import {
  VideosAuthorNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindVideosAuthorByIdRepository } from '@/repositories/videos-authors/find-videos-author-by-id';
import { RemoveVideosAuthorRepository } from '@/repositories/videos-authors/remove-videos-author';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

type RemoveVideosAuthorCommandKeys = keyof RemoveVideosAuthorCommand;

@CommandHandler(RemoveVideosAuthorCommand)
export class RemoveVideosAuthorCommandHandler
  implements ICommandHandler<RemoveVideosAuthorCommand>
{
  constructor(
    private readonly findVideosAuthorByIdRepository: FindVideosAuthorByIdRepository,
    private readonly removeVideosAuthorRepository: RemoveVideosAuthorRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemoveVideosAuthorCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    const videosAuthorId = splitServiceId(data.where?.videosAuthorId)?.id;
    if (!videosAuthorId) {
      throw new ParamNotFoundException('videosAuthorId');
    }

    const videosAuthor = await this.findVideosAuthorByIdRepository.execute(
      videosAuthorId
    );
    if (!videosAuthor) {
      throw new VideosAuthorNotFoundException();
    }

    const removed = await this.removeVideosAuthorRepository.execute({
      where: {
        videosAuthorId
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const videosAuthorModel = this.publisher.mergeObjectContext(videosAuthor);
    videosAuthorModel.removedVideosAuthor();
    videosAuthorModel.commit();

    return videosAuthor;
  }

  private clearData(
    command: RemoveVideosAuthorCommand
  ): RemoveVideosAuthorCommand {
    return cleanObject({
      where: cleanObject({
        videosAuthorId: cleanValue(command?.where?.videosAuthorId)
      })
    });
  }
}
