import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreateTagCommand } from '@/commands/implements/tags/create-tag.command';
import {
  DataNotFoundException,
  ParamNotFoundException,
  TagNotFoundException
} from '@/errors';
import { CreateTagRepository } from '@/repositories/tags/create-tag';

type CreateTagCommandKeys = keyof CreateTagCommand;

@CommandHandler(CreateTagCommand)
export class CreateTagCommandHandler
  implements ICommandHandler<CreateTagCommand>
{
  constructor(
    private readonly createTagRepository: CreateTagRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateTagCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.parent) {
      throw new ParamNotFoundException<CreateTagCommandKeys>('parent');
    }

    const tagCreated = await this.createTagRepository.execute(data);
    if (!tagCreated) {
      throw new TagNotFoundException();
    }
    const tagModel = this.publisher.mergeObjectContext(tagCreated);
    tagModel.createdTag();
    tagModel.commit();

    return tagCreated;
  }

  private clearData(command: CreateTagCommand): CreateTagCommand {
    return cleanObject({
      name: cleanValue(command?.name),
      parent: cleanValue(command?.parent)
    });
  }
}
