import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreateVideosAuthorCommand } from '@/commands/implements/videos-authors/create-videos-author.command';
import {
  DataNotFoundException,
  ParamNotFoundException,
  VideosAuthorNotFoundException
} from '@/errors';
import { CreateVideosAuthorRepository } from '@/repositories/videos-authors/create-videos-author';

type CreateVideosAuthorCommandKeys = keyof CreateVideosAuthorCommand;

@CommandHandler(CreateVideosAuthorCommand)
export class CreateVideosAuthorCommandHandler
  implements ICommandHandler<CreateVideosAuthorCommand>
{
  constructor(
    private readonly createVideosAuthorRepository: CreateVideosAuthorRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateVideosAuthorCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.parent) {
      throw new ParamNotFoundException<CreateVideosAuthorCommandKeys>('parent');
    }

    const videosAuthorCreated = await this.createVideosAuthorRepository.execute(
      data
    );
    if (!videosAuthorCreated) {
      throw new VideosAuthorNotFoundException();
    }
    const videosAuthorModel =
      this.publisher.mergeObjectContext(videosAuthorCreated);
    videosAuthorModel.createdVideosAuthor();
    videosAuthorModel.commit();

    return videosAuthorCreated;
  }

  private clearData(
    command: CreateVideosAuthorCommand
  ): CreateVideosAuthorCommand {
    return cleanObject({
      name: cleanValue(command?.name),
      parent: cleanValue(command?.parent)
    });
  }
}
