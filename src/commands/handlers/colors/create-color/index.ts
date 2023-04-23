import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreateColorCommand } from '@/commands/implements/colors/create-color.command';
import {
  ColorAlreadyExistsException,
  ColorNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CreateColorRepository } from '@/repositories/colors/create-color';
import { FindAllColorsService } from '@/services/colors/find-all-colors';

type CreateColorCommandKeys = keyof CreateColorCommand;

@CommandHandler(CreateColorCommand)
export class CreateColorCommandHandler
  implements ICommandHandler<CreateColorCommand>
{
  constructor(
    private readonly createColorRepository: CreateColorRepository,
    private readonly findAllColorsService: FindAllColorsService,
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
    if (!data?.color) {
      throw new ParamNotFoundException<CreateColorCommandKeys>('color');
    }

    const colors = await this.findAllColorsService.execute({
      where: {
        AND: {
          app: {
            equals: data.app
          },
          parent: {
            equals: data.parent
          },
          themeMode: data.themeMode,
          type: data.type,
          color: {
            equals: data.color
          }
        }
      },
      page: {
        limit: 1
      }
    });

    if (colors?.totalCount > 0) {
      throw new ColorAlreadyExistsException();
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
