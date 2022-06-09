import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { UpdatePriceCommand } from '@/commands/implements/prices/update-price.command';
import { UpdatePriceDTO } from '@/dtos/prices/update-price.dto';
import { PriceModel } from '@/models/price.model';

@Injectable()
export class UpdatePriceService
  implements IBaseService<UpdatePriceDTO, Promise<PriceModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: UpdatePriceDTO): Promise<PriceModel> {
    return await this.commandBus.execute(new UpdatePriceCommand(data));
  }
}
