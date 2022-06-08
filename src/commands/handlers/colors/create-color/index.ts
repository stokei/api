import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateColorCommand } from '@/commands/implements/colors/create-color.command';
import {
  ColorNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CreateColorRepository } from '@/repositories/colors/create-color';
import { cleanObject, cleanValue } from '@stokei/nestjs';

type CreateColorCommandKeys = keyof CreateColorCommand;

@CommandHandler(CreateColorCommand)
export class CreateColorCommandHandler
  implements ICommandHandler<CreateColorCommand>
{
  constructor(
    private readonly createColorRepository: CreateColorRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateColorCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.parent) {
      throw new ParamNotFoundException<CreateColorCommandKeys>('parent');
    }

    const colorCreated = await this.createColorRepository.execute(data);
    if (!colorCreated) {
      throw new ColorNotFoundException();
    }
    const colorModel = this.publisher.mergeObjectContext(colorCreated);
    colorModel.createdColor();
    colorModel.commit();

    return colorCreated;
  }

  private clearData(command: CreateColorCommand): CreateColorCommand {
    return cleanObject({
      name: cleanValue(command?.name),
      parent: cleanValue(command?.parent)
    });
  }
}
