import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import {
  cleanObject,
  cleanSlug,
  cleanValue,
  cleanValueBoolean,
  cleanValueNumber
} from '@stokei/nestjs';
import { nanoid } from 'nanoid';

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
    if (!data?.name) {
      throw new ParamNotFoundException<CreateVideoCommandKeys>('name');
    }

    const slug = cleanSlug(data.name + nanoid(8));
    const videoCreated = await this.createVideoRepository.execute({
      ...data,
      active: false,
      slug
    });
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
      createdBy: cleanValue(command?.createdBy),
      app: cleanValue(command?.app),
      name: cleanValue(command?.name),
      description: cleanValue(command?.description),
      file: cleanValue(command?.file),
      poster: cleanValue(command?.poster),
      duration: cleanValueNumber(command?.duration),
      private: cleanValueBoolean(command?.private),
      parent: cleanValue(command?.parent)
    });
  }
}
