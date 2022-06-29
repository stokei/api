import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { UpdateColorCommand } from '@/commands/implements/colors/update-color.command';
import {
  ColorNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindColorByIdRepository } from '@/repositories/colors/find-color-by-id';
import { UpdateColorRepository } from '@/repositories/colors/update-color';

type UpdateColorCommandKeys = keyof UpdateColorCommand;

@CommandHandler(UpdateColorCommand)
export class UpdateColorCommandHandler
  implements ICommandHandler<UpdateColorCommand>
{
  constructor(
    private readonly findColorByIdRepository: FindColorByIdRepository,
    private readonly updateColorRepository: UpdateColorRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdateColorCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    const colorId = splitServiceId(data.where?.colorId)?.id;
    if (!colorId) {
      throw new ParamNotFoundException('colorId');
    }

    const color = await this.findColorByIdRepository.execute(colorId);
    if (!color) {
      throw new ColorNotFoundException();
    }

    const updated = await this.updateColorRepository.execute({
      ...data,
      where: {
        ...data.where,
        colorId
      }
    });
    if (!updated) {
      throw new DataNotFoundException();
    }

    const colorUpdated = await this.findColorByIdRepository.execute(colorId);
    if (!colorUpdated) {
      throw new ColorNotFoundException();
    }
    const colorModel = this.publisher.mergeObjectContext(colorUpdated);
    colorModel.updatedColor();
    colorModel.commit();

    return colorUpdated;
  }

  private clearData(command: UpdateColorCommand): UpdateColorCommand {
    return cleanObject({
      where: cleanObject({
        colorId: cleanValue(command?.where?.colorId)
      }),
      data: cleanObject({
        name: cleanValue(command?.data?.name),
        updatedBy: cleanValue(command?.data?.updatedBy)
      })
    });
  }
}
