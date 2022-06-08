import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UpdateTagCommand } from '@/commands/implements/tags/update-tag.command';
import {
  TagNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindTagByIdRepository } from '@/repositories/tags/find-tag-by-id';
import { UpdateTagRepository } from '@/repositories/tags/update-tag';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

type UpdateTagCommandKeys = keyof UpdateTagCommand;

@CommandHandler(UpdateTagCommand)
export class UpdateTagCommandHandler
  implements ICommandHandler<UpdateTagCommand>
{
  constructor(
    private readonly findTagByIdRepository: FindTagByIdRepository,
    private readonly updateTagRepository: UpdateTagRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdateTagCommand) {
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

    const updated = await this.updateTagRepository.execute({
      ...data,
      where: {
        ...data.where,
        tagId
      }
    });
    if (!updated) {
      throw new DataNotFoundException();
    }

    const tagUpdated = await this.findTagByIdRepository.execute(tagId);
    if (!tagUpdated) {
      throw new TagNotFoundException();
    }
    const tagModel = this.publisher.mergeObjectContext(tagUpdated);
    tagModel.updatedTag();
    tagModel.commit();

    return tagUpdated;
  }

  private clearData(command: UpdateTagCommand): UpdateTagCommand {
    return cleanObject({
      where: cleanObject({
        tagId: cleanValue(command?.where?.tagId)
      }),
      data: cleanObject({
        name: cleanValue(command?.data?.name)
      })
    });
  }
}
