import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UpdateVideosMaterialCommand } from '@/commands/implements/videos-materials/update-videos-material.command';
import {
  VideosMaterialNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindVideosMaterialByIdRepository } from '@/repositories/videos-materials/find-videos-material-by-id';
import { UpdateVideosMaterialRepository } from '@/repositories/videos-materials/update-videos-material';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

type UpdateVideosMaterialCommandKeys = keyof UpdateVideosMaterialCommand;

@CommandHandler(UpdateVideosMaterialCommand)
export class UpdateVideosMaterialCommandHandler
  implements ICommandHandler<UpdateVideosMaterialCommand>
{
  constructor(
    private readonly findVideosMaterialByIdRepository: FindVideosMaterialByIdRepository,
    private readonly updateVideosMaterialRepository: UpdateVideosMaterialRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdateVideosMaterialCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    const videosMaterialId = splitServiceId(data.where?.videosMaterialId)?.id;
    if (!videosMaterialId) {
      throw new ParamNotFoundException('videosMaterialId');
    }

    const videosMaterial = await this.findVideosMaterialByIdRepository.execute(
      videosMaterialId
    );
    if (!videosMaterial) {
      throw new VideosMaterialNotFoundException();
    }

    const updated = await this.updateVideosMaterialRepository.execute({
      ...data,
      where: {
        ...data.where,
        videosMaterialId
      }
    });
    if (!updated) {
      throw new DataNotFoundException();
    }

    const videosMaterialUpdated =
      await this.findVideosMaterialByIdRepository.execute(videosMaterialId);
    if (!videosMaterialUpdated) {
      throw new VideosMaterialNotFoundException();
    }
    const videosMaterialModel = this.publisher.mergeObjectContext(
      videosMaterialUpdated
    );
    videosMaterialModel.updatedVideosMaterial();
    videosMaterialModel.commit();

    return videosMaterialUpdated;
  }

  private clearData(
    command: UpdateVideosMaterialCommand
  ): UpdateVideosMaterialCommand {
    return cleanObject({
      where: cleanObject({
        videosMaterialId: cleanValue(command?.where?.videosMaterialId)
      }),
      data: cleanObject({
        name: cleanValue(command?.data?.name)
      })
    });
  }
}
