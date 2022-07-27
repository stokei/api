import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { RemoveVideoAuthorCommand } from '@/commands/implements/video-authors/remove-video-author.command';
import {
  DataNotFoundException,
  ParamNotFoundException,
  VideoAuthorNotFoundException
} from '@/errors';
import { FindAllVideoAuthorsRepository } from '@/repositories/video-authors/find-all-video-authors';
import { RemoveVideoAuthorRepository } from '@/repositories/video-authors/remove-video-author';

@CommandHandler(RemoveVideoAuthorCommand)
export class RemoveVideoAuthorCommandHandler
  implements ICommandHandler<RemoveVideoAuthorCommand>
{
  constructor(
    private readonly findAllVideoAuthorsRepository: FindAllVideoAuthorsRepository,
    private readonly removeVideoAuthorRepository: RemoveVideoAuthorRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemoveVideoAuthorCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data.where?.removedBy) {
      throw new ParamNotFoundException('removedBy');
    }
    const { video, author, app } = data.where || {};
    if (!video) {
      throw new ParamNotFoundException('videoId');
    }
    if (!author) {
      throw new ParamNotFoundException('authorId');
    }

    const videoAuthors = await this.findAllVideoAuthorsRepository.execute({
      where: {
        AND: {
          app: {
            equals: app
          },
          video: {
            equals: video
          },
          author: {
            equals: author
          }
        }
      }
    });
    if (!videoAuthors?.length) {
      throw new VideoAuthorNotFoundException();
    }
    const videoAuthor = videoAuthors[0];
    const removed = await this.removeVideoAuthorRepository.execute({
      where: {
        ...data.where,
        video,
        author
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const videoAuthorModel = this.publisher.mergeObjectContext(videoAuthor);
    videoAuthorModel.removedVideoAuthor({
      removedBy: data.where.removedBy
    });
    videoAuthorModel.commit();

    return videoAuthor;
  }

  private clearData(
    command: RemoveVideoAuthorCommand
  ): RemoveVideoAuthorCommand {
    return cleanObject({
      where: cleanObject({
        removedBy: cleanValue(command?.where?.removedBy),
        app: cleanValue(command?.where?.app),
        video: cleanValue(command?.where?.video),
        author: cleanValue(command?.where?.author)
      })
    });
  }
}
