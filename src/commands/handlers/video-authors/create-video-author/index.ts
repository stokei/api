import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreateVideoAuthorCommand } from '@/commands/implements/video-authors/create-video-author.command';
import {
  DataNotFoundException,
  ParamNotFoundException,
  VideoAuthorNotFoundException
} from '@/errors';
import { CreateVideoAuthorRepository } from '@/repositories/video-authors/create-video-author';

type CreateVideoAuthorCommandKeys = keyof CreateVideoAuthorCommand;

@CommandHandler(CreateVideoAuthorCommand)
export class CreateVideoAuthorCommandHandler
  implements ICommandHandler<CreateVideoAuthorCommand>
{
  constructor(
    private readonly createVideoAuthorRepository: CreateVideoAuthorRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateVideoAuthorCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.author) {
      throw new ParamNotFoundException<CreateVideoAuthorCommandKeys>('author');
    }
    if (!data?.video) {
      throw new ParamNotFoundException<CreateVideoAuthorCommandKeys>('video');
    }

    const videoAuthorCreated = await this.createVideoAuthorRepository.execute(
      data
    );
    if (!videoAuthorCreated) {
      throw new VideoAuthorNotFoundException();
    }
    const videoAuthorModel =
      this.publisher.mergeObjectContext(videoAuthorCreated);
    videoAuthorModel.createdVideoAuthor({
      createdBy: data.createdBy
    });
    videoAuthorModel.commit();

    return videoAuthorCreated;
  }

  private clearData(
    command: CreateVideoAuthorCommand
  ): CreateVideoAuthorCommand {
    return cleanObject({
      createdBy: cleanValue(command?.createdBy),
      app: cleanValue(command?.app),
      video: cleanValue(command?.video),
      author: cleanValue(command?.author)
    });
  }
}
