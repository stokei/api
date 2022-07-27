import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreateImageCommand } from '@/commands/implements/images/create-image.command';
import {
  DataNotFoundException,
  ImageNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CreateImageRepository } from '@/repositories/images/create-image';

type CreateImageCommandKeys = keyof CreateImageCommand;

@CommandHandler(CreateImageCommand)
export class CreateImageCommandHandler
  implements ICommandHandler<CreateImageCommand>
{
  constructor(
    private readonly createImageRepository: CreateImageRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateImageCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.path) {
      throw new ParamNotFoundException<CreateImageCommandKeys>('path');
    }

    const imageCreated = await this.createImageRepository.execute(data);
    if (!imageCreated) {
      throw new ImageNotFoundException();
    }
    const imageModel = this.publisher.mergeObjectContext(imageCreated);
    imageModel.createdImage({
      createdBy: data.createdBy
    });
    imageModel.commit();

    return imageCreated;
  }

  private clearData(command: CreateImageCommand): CreateImageCommand {
    return cleanObject({
      createdBy: cleanValue(command?.createdBy),
      app: cleanValue(command?.app),
      path: cleanValue(command?.path)
    });
  }
}
