import { CreateColorCommand } from '@/commands/implements/colors/create-color.command';
import { CreateColorDTO } from '@/dtos/colors/create-color.dto';
import { ColorModel } from '@/models/color.model';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

@Injectable()
export class CreateColorService
  implements IBaseService<CreateColorDTO, Promise<ColorModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreateColorDTO): Promise<ColorModel> {
    return await this.commandBus.execute(new CreateColorCommand(data));
  }
}
