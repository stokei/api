import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { ActivatePriceCommand } from '@/commands/implements/prices/activate-price.command';
import { ActivatePriceDTO } from '@/dtos/prices/activate-price.dto';
import { PriceModel } from '@/models/price.model';

@Injectable()
export class ActivatePriceService
  implements IBaseService<ActivatePriceDTO, Promise<PriceModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: ActivatePriceDTO): Promise<PriceModel> {
    return await this.commandBus.execute(new ActivatePriceCommand(data));
  }
}
