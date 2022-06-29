import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreateVideoCommand } from '@/commands/implements/videos/create-video.command';
import {
  DataNotFoundException,
  ParamNotFoundException,
  VideoNotFoundException
} from '@/errors';
import { CreateVideoRepository } from '@/repositories/videos/create-video';

type CreateVideoCommandKeys = keyof CreateVideoCommand;

@CommandHandler(CreateVideoCommand)
export class CreateVideoCommandHandler
  implements ICommandHandler<CreateVideoCommand>
{
  constructor(
    private readonly createVideoRepository: CreateVideoRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateVideoCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.parent) {
      throw new ParamNotFoundException<CreateVideoCommandKeys>('parent');
    }

    const videoCreated = await this.createVideoRepository.execute(data);
    if (!videoCreated) {
      throw new VideoNotFoundException();
    }
    const videoModel = this.publisher.mergeObjectContext(videoCreated);
    videoModel.createdVideo({
      createdBy: data.createdBy
    });
    videoModel.commit();

    return videoCreated;
  }

  private clearData(command: CreateVideoCommand): CreateVideoCommand {
    return cleanObject({
      name: cleanValue(command?.name),
      parent: cleanValue(command?.parent)
    });
  }
}
