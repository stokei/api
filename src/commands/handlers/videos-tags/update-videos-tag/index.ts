import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UpdateVideosTagCommand } from '@/commands/implements/videos-tags/update-videos-tag.command';
import {
  VideosTagNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindVideosTagByIdRepository } from '@/repositories/videos-tags/find-videos-tag-by-id';
import { UpdateVideosTagRepository } from '@/repositories/videos-tags/update-videos-tag';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

type UpdateVideosTagCommandKeys = keyof UpdateVideosTagCommand;

@CommandHandler(UpdateVideosTagCommand)
export class UpdateVideosTagCommandHandler
  implements ICommandHandler<UpdateVideosTagCommand>
{
  constructor(
    private readonly findVideosTagByIdRepository: FindVideosTagByIdRepository,
    private readonly updateVideosTagRepository: UpdateVideosTagRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdateVideosTagCommand) {
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

    const updated = await this.updateVideosTagRepository.execute({
      ...data,
      where: {
        ...data.where,
        videosTagId
      }
    });
    if (!updated) {
      throw new DataNotFoundException();
    }

    const videosTagUpdated = await this.findVideosTagByIdRepository.execute(
      videosTagId
    );
    if (!videosTagUpdated) {
      throw new VideosTagNotFoundException();
    }
    const videosTagModel = this.publisher.mergeObjectContext(videosTagUpdated);
    videosTagModel.updatedVideosTag();
    videosTagModel.commit();

    return videosTagUpdated;
  }

  private clearData(command: UpdateVideosTagCommand): UpdateVideosTagCommand {
    return cleanObject({
      where: cleanObject({
        videosTagId: cleanValue(command?.where?.videosTagId)
      }),
      data: cleanObject({
        name: cleanValue(command?.data?.name)
      })
    });
  }
}
