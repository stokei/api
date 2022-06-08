import { UpdateColorCommand } from '@/commands/implements/colors/update-color.command';
import { UpdateColorDTO } from '@/dtos/colors/update-color.dto';
import { ColorModel } from '@/models/color.model';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

@Injectable()
export class UpdateColorService
  implements IBaseService<UpdateColorDTO, Promise<ColorModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: UpdateColorDTO): Promise<ColorModel> {
    return await this.commandBus.execute(new UpdateColorCommand(data));
  }
}
