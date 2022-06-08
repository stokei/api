import { RemoveColorCommand } from '@/commands/implements/colors/remove-color.command';
import { RemoveColorDTO } from '@/dtos/colors/remove-color.dto';
import { ColorModel } from '@/models/color.model';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

@Injectable()
export class RemoveColorService
  implements IBaseService<RemoveColorDTO, Promise<ColorModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: RemoveColorDTO): Promise<ColorModel> {
    return await this.commandBus.execute(new RemoveColorCommand(data));
  }
}
