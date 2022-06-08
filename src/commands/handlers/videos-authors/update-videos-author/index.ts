import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UpdateVideosAuthorCommand } from '@/commands/implements/videos-authors/update-videos-author.command';
import {
  VideosAuthorNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindVideosAuthorByIdRepository } from '@/repositories/videos-authors/find-videos-author-by-id';
import { UpdateVideosAuthorRepository } from '@/repositories/videos-authors/update-videos-author';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

type UpdateVideosAuthorCommandKeys = keyof UpdateVideosAuthorCommand;

@CommandHandler(UpdateVideosAuthorCommand)
export class UpdateVideosAuthorCommandHandler
  implements ICommandHandler<UpdateVideosAuthorCommand>
{
  constructor(
    private readonly findVideosAuthorByIdRepository: FindVideosAuthorByIdRepository,
    private readonly updateVideosAuthorRepository: UpdateVideosAuthorRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdateVideosAuthorCommand) {
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

    const updated = await this.updateVideosAuthorRepository.execute({
      ...data,
      where: {
        ...data.where,
        videosAuthorId
      }
    });
    if (!updated) {
      throw new DataNotFoundException();
    }

    const videosAuthorUpdated =
      await this.findVideosAuthorByIdRepository.execute(videosAuthorId);
    if (!videosAuthorUpdated) {
      throw new VideosAuthorNotFoundException();
    }
    const videosAuthorModel =
      this.publisher.mergeObjectContext(videosAuthorUpdated);
    videosAuthorModel.updatedVideosAuthor();
    videosAuthorModel.commit();

    return videosAuthorUpdated;
  }

  private clearData(
    command: UpdateVideosAuthorCommand
  ): UpdateVideosAuthorCommand {
    return cleanObject({
      where: cleanObject({
        videosAuthorId: cleanValue(command?.where?.videosAuthorId)
      }),
      data: cleanObject({
        name: cleanValue(command?.data?.name)
      })
    });
  }
}
