import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreateColorCommand } from '@/commands/implements/colors/create-color.command';
import {
  ColorNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CreateColorRepository } from '@/repositories/colors/create-color';

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
    colorModel.createdColor({
      createdBy: data.createdBy
    });
    colorModel.commit();

    return colorCreated;
  }

  private clearData(command: CreateColorCommand): CreateColorCommand {
    return cleanObject({
      createdBy: cleanValue(command?.createdBy),
      app: cleanValue(command?.app),
      themeMode: command?.themeMode,
      type: command?.type,
      color: cleanValue(command?.color),
      parent: cleanValue(command?.parent)
    });
  }
}
