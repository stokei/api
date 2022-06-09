import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreateVideosMaterialCommand } from '@/commands/implements/videos-materials/create-videos-material.command';
import {
  DataNotFoundException,
  ParamNotFoundException,
  VideosMaterialNotFoundException
} from '@/errors';
import { CreateVideosMaterialRepository } from '@/repositories/videos-materials/create-videos-material';

type CreateVideosMaterialCommandKeys = keyof CreateVideosMaterialCommand;

@CommandHandler(CreateVideosMaterialCommand)
export class CreateVideosMaterialCommandHandler
  implements ICommandHandler<CreateVideosMaterialCommand>
{
  constructor(
    private readonly createVideosMaterialRepository: CreateVideosMaterialRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateVideosMaterialCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.parent) {
      throw new ParamNotFoundException<CreateVideosMaterialCommandKeys>(
        'parent'
      );
    }

    const videosMaterialCreated =
      await this.createVideosMaterialRepository.execute(data);
    if (!videosMaterialCreated) {
      throw new VideosMaterialNotFoundException();
    }
    const videosMaterialModel = this.publisher.mergeObjectContext(
      videosMaterialCreated
    );
    videosMaterialModel.createdVideosMaterial();
    videosMaterialModel.commit();

    return videosMaterialCreated;
  }

  private clearData(
    command: CreateVideosMaterialCommand
  ): CreateVideosMaterialCommand {
    return cleanObject({
      name: cleanValue(command?.name),
      parent: cleanValue(command?.parent)
    });
  }
}
