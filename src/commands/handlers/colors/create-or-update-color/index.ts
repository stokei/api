import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreateOrUpdateColorCommand } from '@/commands/implements/colors/create-or-update-color.command';
import { DataNotFoundException, ParamNotFoundException } from '@/errors';
import { ColorModel } from '@/models/color.model';
import { CreateColorService } from '@/services/colors/create-color';
import { FindAllColorsService } from '@/services/colors/find-all-colors';
import { UpdateColorService } from '@/services/colors/update-color';

type CreateOrUpdateColorCommandKeys = keyof CreateOrUpdateColorCommand;

@CommandHandler(CreateOrUpdateColorCommand)
export class CreateOrUpdateColorCommandHandler
  implements ICommandHandler<CreateOrUpdateColorCommand>
{
  constructor(
    private readonly createColorService: CreateColorService,
    private readonly findAllColorsService: FindAllColorsService,
    private readonly updateColorService: UpdateColorService
  ) {}

  async execute(command: CreateOrUpdateColorCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.parent) {
      throw new ParamNotFoundException<CreateOrUpdateColorCommandKeys>(
        'parent'
      );
    }
    if (!data?.color) {
      throw new ParamNotFoundException<CreateOrUpdateColorCommandKeys>('color');
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
          type: data.type
        }
      },
      page: {
        limit: 1
      }
    });

    let currentColor: ColorModel = colors?.items?.[0];
    const existsColor = !!(colors?.totalCount > 0 && currentColor);
    if (existsColor) {
      currentColor = await this.updateColorService.execute({
        data: {
          color: data.color,
          updatedBy: data.createdBy
        },
        where: {
          app: data.app,
          color: currentColor.id
        }
      });
    } else {
      currentColor = await this.createColorService.execute(data);
    }
    return currentColor;
  }

  private clearData(
    command: CreateOrUpdateColorCommand
  ): CreateOrUpdateColorCommand {
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
