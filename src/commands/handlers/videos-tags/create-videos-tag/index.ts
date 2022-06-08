import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateVideosTagCommand } from '@/commands/implements/videos-tags/create-videos-tag.command';
import {
  VideosTagNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CreateVideosTagRepository } from '@/repositories/videos-tags/create-videos-tag';
import { cleanObject, cleanValue } from '@stokei/nestjs';

type CreateVideosTagCommandKeys = keyof CreateVideosTagCommand;

@CommandHandler(CreateVideosTagCommand)
export class CreateVideosTagCommandHandler
  implements ICommandHandler<CreateVideosTagCommand>
{
  constructor(
    private readonly createVideosTagRepository: CreateVideosTagRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateVideosTagCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.parent) {
      throw new ParamNotFoundException<CreateVideosTagCommandKeys>('parent');
    }

    const videosTagCreated = await this.createVideosTagRepository.execute(data);
    if (!videosTagCreated) {
      throw new VideosTagNotFoundException();
    }
    const videosTagModel = this.publisher.mergeObjectContext(videosTagCreated);
    videosTagModel.createdVideosTag();
    videosTagModel.commit();

    return videosTagCreated;
  }

  private clearData(command: CreateVideosTagCommand): CreateVideosTagCommand {
    return cleanObject({
      name: cleanValue(command?.name),
      parent: cleanValue(command?.parent)
    });
  }
}
