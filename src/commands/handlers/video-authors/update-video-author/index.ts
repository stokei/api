import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { UpdateVideoAuthorCommand } from '@/commands/implements/video-authors/update-video-author.command';
import {
  DataNotFoundException,
  ParamNotFoundException,
  VideoAuthorNotFoundException
} from '@/errors';
import { FindVideoAuthorByIdRepository } from '@/repositories/video-authors/find-video-author-by-id';
import { UpdateVideoAuthorRepository } from '@/repositories/video-authors/update-video-author';

type UpdateVideoAuthorCommandKeys = keyof UpdateVideoAuthorCommand;

@CommandHandler(UpdateVideoAuthorCommand)
export class UpdateVideoAuthorCommandHandler
  implements ICommandHandler<UpdateVideoAuthorCommand>
{
  constructor(
    private readonly findVideoAuthorByIdRepository: FindVideoAuthorByIdRepository,
    private readonly updateVideoAuthorRepository: UpdateVideoAuthorRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdateVideoAuthorCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
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

    const updated = await this.updateVideoAuthorRepository.execute({
      ...data,
      where: {
        ...data.where,
        videoAuthorId
      }
    });
    if (!updated) {
      throw new DataNotFoundException();
    }

    const videoAuthorUpdated = await this.findVideoAuthorByIdRepository.execute(
      videoAuthorId
    );
    if (!videoAuthorUpdated) {
      throw new VideoAuthorNotFoundException();
    }
    const videoAuthorModel =
      this.publisher.mergeObjectContext(videoAuthorUpdated);
    videoAuthorModel.updatedVideoAuthor({
      updatedBy: data.data.updatedBy
    });
    videoAuthorModel.commit();

    return videoAuthorUpdated;
  }

  private clearData(
    command: UpdateVideoAuthorCommand
  ): UpdateVideoAuthorCommand {
    return cleanObject({
      where: cleanObject({
        videoAuthorId: cleanValue(command?.where?.videoAuthorId)
      }),
      data: cleanObject({
        name: cleanValue(command?.data?.name),
        updatedBy: cleanValue(command?.data?.updatedBy)
      })
    });
  }
}
