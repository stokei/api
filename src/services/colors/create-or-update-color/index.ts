import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CreateOrUpdateColorCommand } from '@/commands/implements/colors/create-or-update-color.command';
import { CreateOrUpdateColorDTO } from '@/dtos/colors/create-or-update-color.dto';
import { ColorModel } from '@/models/color.model';

@Injectable()
export class CreateOrUpdateColorService
  implements IBaseService<CreateOrUpdateColorDTO, Promise<ColorModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreateOrUpdateColorDTO): Promise<ColorModel> {
    return await this.commandBus.execute(new CreateOrUpdateColorCommand(data));
  }
}
