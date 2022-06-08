import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RemoveMetatagCommand } from '@/commands/implements/metatags/remove-metatag.command';
import {
  MetatagNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindMetatagByIdRepository } from '@/repositories/metatags/find-metatag-by-id';
import { RemoveMetatagRepository } from '@/repositories/metatags/remove-metatag';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

type RemoveMetatagCommandKeys = keyof RemoveMetatagCommand;

@CommandHandler(RemoveMetatagCommand)
export class RemoveMetatagCommandHandler
  implements ICommandHandler<RemoveMetatagCommand>
{
  constructor(
    private readonly findMetatagByIdRepository: FindMetatagByIdRepository,
    private readonly removeMetatagRepository: RemoveMetatagRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemoveMetatagCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    const metatagId = splitServiceId(data.where?.metatagId)?.id;
    if (!metatagId) {
      throw new ParamNotFoundException('metatagId');
    }

    const metatag = await this.findMetatagByIdRepository.execute(metatagId);
    if (!metatag) {
      throw new MetatagNotFoundException();
    }

    const removed = await this.removeMetatagRepository.execute({
      where: {
        metatagId
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const metatagModel = this.publisher.mergeObjectContext(metatag);
    metatagModel.removedMetatag();
    metatagModel.commit();

    return metatag;
  }

  private clearData(command: RemoveMetatagCommand): RemoveMetatagCommand {
    return cleanObject({
      where: cleanObject({
        metatagId: cleanValue(command?.where?.metatagId)
      })
    });
  }
}
