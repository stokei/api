import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { RemoveTagCommand } from '@/commands/implements/tags/remove-tag.command';
import {
  DataNotFoundException,
  ParamNotFoundException,
  TagNotFoundException
} from '@/errors';
import { FindTagByIdRepository } from '@/repositories/tags/find-tag-by-id';
import { RemoveTagRepository } from '@/repositories/tags/remove-tag';

type RemoveTagCommandKeys = keyof RemoveTagCommand;

@CommandHandler(RemoveTagCommand)
export class RemoveTagCommandHandler
  implements ICommandHandler<RemoveTagCommand>
{
  constructor(
    private readonly findTagByIdRepository: FindTagByIdRepository,
    private readonly removeTagRepository: RemoveTagRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemoveTagCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    const tagId = splitServiceId(data.where?.tagId)?.id;
    if (!tagId) {
      throw new ParamNotFoundException('tagId');
    }

    const tag = await this.findTagByIdRepository.execute(tagId);
    if (!tag) {
      throw new TagNotFoundException();
    }

    const removed = await this.removeTagRepository.execute({
      where: {
        tagId
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const tagModel = this.publisher.mergeObjectContext(tag);
    tagModel.removedTag();
    tagModel.commit();

    return tag;
  }

  private clearData(command: RemoveTagCommand): RemoveTagCommand {
    return cleanObject({
      where: cleanObject({
        tagId: cleanValue(command?.where?.tagId)
      })
    });
  }
}
