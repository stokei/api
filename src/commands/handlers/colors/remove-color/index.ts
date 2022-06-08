import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RemoveColorCommand } from '@/commands/implements/colors/remove-color.command';
import {
  ColorNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindColorByIdRepository } from '@/repositories/colors/find-color-by-id';
import { RemoveColorRepository } from '@/repositories/colors/remove-color';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

type RemoveColorCommandKeys = keyof RemoveColorCommand;

@CommandHandler(RemoveColorCommand)
export class RemoveColorCommandHandler
  implements ICommandHandler<RemoveColorCommand>
{
  constructor(
    private readonly findColorByIdRepository: FindColorByIdRepository,
    private readonly removeColorRepository: RemoveColorRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemoveColorCommand) {
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

    const removed = await this.removeColorRepository.execute({
      where: {
        colorId
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const colorModel = this.publisher.mergeObjectContext(color);
    colorModel.removedColor();
    colorModel.commit();

    return color;
  }

  private clearData(command: RemoveColorCommand): RemoveColorCommand {
    return cleanObject({
      where: cleanObject({
        colorId: cleanValue(command?.where?.colorId)
      })
    });
  }
}
