import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { RemoveVideoAuthorCommand } from '@/commands/implements/video-authors/remove-video-author.command';
import {
  DataNotFoundException,
  ParamNotFoundException,
  VideoAuthorNotFoundException
} from '@/errors';
import { FindVideoAuthorByIdRepository } from '@/repositories/video-authors/find-video-author-by-id';
import { RemoveVideoAuthorRepository } from '@/repositories/video-authors/remove-video-author';

type RemoveVideoAuthorCommandKeys = keyof RemoveVideoAuthorCommand;

@CommandHandler(RemoveVideoAuthorCommand)
export class RemoveVideoAuthorCommandHandler
  implements ICommandHandler<RemoveVideoAuthorCommand>
{
  constructor(
    private readonly findVideoAuthorByIdRepository: FindVideoAuthorByIdRepository,
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
    const videoAuthorId = splitServiceId(data.where?.videoAuthorId)?.id;
    if (!videoAuthorId) {
      throw new ParamNotFoundException('videoAuthorId');
    }

    const videoAuthor = await this.findVideoAuthorByIdRepository.execute(
      videoAuthorId
    );
    if (!videoAuthor) {
      throw new VideoAuthorNotFoundException();
    }

    const removed = await this.removeVideoAuthorRepository.execute({
      where: {
        ...data.where,
        videoAuthorId
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
        videoAuthorId: cleanValue(command?.where?.videoAuthorId)
      })
    });
  }
}
