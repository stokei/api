import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { UpdateImageCommand } from '@/commands/implements/images/update-image.command';
import {
  DataNotFoundException,
  ImageNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindImageByIdRepository } from '@/repositories/images/find-image-by-id';
import { UpdateImageRepository } from '@/repositories/images/update-image';

type UpdateImageCommandKeys = keyof UpdateImageCommand;

@CommandHandler(UpdateImageCommand)
export class UpdateImageCommandHandler
  implements ICommandHandler<UpdateImageCommand>
{
  constructor(
    private readonly findImageByIdRepository: FindImageByIdRepository,
    private readonly updateImageRepository: UpdateImageRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdateImageCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    const imageId = splitServiceId(data.where?.imageId)?.id;
    if (!imageId) {
      throw new ParamNotFoundException('imageId');
    }

    const image = await this.findImageByIdRepository.execute(imageId);
    if (!image) {
      throw new ImageNotFoundException();
    }

    const updated = await this.updateImageRepository.execute({
      ...data,
      where: {
        ...data.where,
        imageId
      }
    });
    if (!updated) {
      throw new DataNotFoundException();
    }

    const imageUpdated = await this.findImageByIdRepository.execute(imageId);
    if (!imageUpdated) {
      throw new ImageNotFoundException();
    }
    const imageModel = this.publisher.mergeObjectContext(imageUpdated);
    imageModel.updatedImage({
      updatedBy: data.data.updatedBy
    });
    imageModel.commit();

    return imageUpdated;
  }

  private clearData(command: UpdateImageCommand): UpdateImageCommand {
    return cleanObject({
      where: cleanObject({
        imageId: cleanValue(command?.where?.imageId)
      }),
      data: cleanObject({
        name: cleanValue(command?.data?.name),
        updatedBy: cleanValue(command?.data?.updatedBy)
      })
    });
  }
}
