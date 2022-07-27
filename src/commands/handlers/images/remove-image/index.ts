import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { RemoveImageCommand } from '@/commands/implements/images/remove-image.command';
import {
  DataNotFoundException,
  ImageNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindImageByIdRepository } from '@/repositories/images/find-image-by-id';
import { RemoveImageRepository } from '@/repositories/images/remove-image';

@CommandHandler(RemoveImageCommand)
export class RemoveImageCommandHandler
  implements ICommandHandler<RemoveImageCommand>
{
  constructor(
    private readonly findImageByIdRepository: FindImageByIdRepository,
    private readonly removeImageRepository: RemoveImageRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemoveImageCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data.where?.removedBy) {
      throw new ParamNotFoundException('removedBy');
    }
    const imageId = splitServiceId(data.where?.image)?.id;
    if (!imageId) {
      throw new ParamNotFoundException('imageId');
    }

    const image = await this.findImageByIdRepository.execute(imageId);
    if (!image) {
      throw new ImageNotFoundException();
    }

    const removed = await this.removeImageRepository.execute({
      where: {
        ...data.where,
        image: imageId
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const imageModel = this.publisher.mergeObjectContext(image);
    imageModel.removedImage({
      removedBy: data.where.removedBy
    });
    imageModel.commit();

    return image;
  }

  private clearData(command: RemoveImageCommand): RemoveImageCommand {
    return cleanObject({
      where: cleanObject({
        removedBy: cleanValue(command?.where?.removedBy),
        app: cleanValue(command?.where?.app),
        image: cleanValue(command?.where?.image)
      })
    });
  }
}
