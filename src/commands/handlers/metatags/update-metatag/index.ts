import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { UpdateMetatagCommand } from '@/commands/implements/metatags/update-metatag.command';
import {
  DataNotFoundException,
  MetatagNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindMetatagByIdRepository } from '@/repositories/metatags/find-metatag-by-id';
import { UpdateMetatagRepository } from '@/repositories/metatags/update-metatag';

type UpdateMetatagCommandKeys = keyof UpdateMetatagCommand;

@CommandHandler(UpdateMetatagCommand)
export class UpdateMetatagCommandHandler
  implements ICommandHandler<UpdateMetatagCommand>
{
  constructor(
    private readonly findMetatagByIdRepository: FindMetatagByIdRepository,
    private readonly updateMetatagRepository: UpdateMetatagRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdateMetatagCommand) {
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

    const updated = await this.updateMetatagRepository.execute({
      ...data,
      where: {
        ...data.where,
        metatagId
      }
    });
    if (!updated) {
      throw new DataNotFoundException();
    }

    const metatagUpdated = await this.findMetatagByIdRepository.execute(
      metatagId
    );
    if (!metatagUpdated) {
      throw new MetatagNotFoundException();
    }
    const metatagModel = this.publisher.mergeObjectContext(metatagUpdated);
    metatagModel.updatedMetatag();
    metatagModel.commit();

    return metatagUpdated;
  }

  private clearData(command: UpdateMetatagCommand): UpdateMetatagCommand {
    return cleanObject({
      where: cleanObject({
        metatagId: cleanValue(command?.where?.metatagId)
      }),
      data: cleanObject({
        name: cleanValue(command?.data?.name)
      })
    });
  }
}
