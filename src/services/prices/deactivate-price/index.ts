import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { DeactivatePriceCommand } from '@/commands/implements/prices/deactivate-price.command';
import { DeactivatePriceDTO } from '@/dtos/prices/deactivate-price.dto';
import { PriceModel } from '@/models/price.model';

@Injectable()
export class DeactivatePriceService
  implements IBaseService<DeactivatePriceDTO, Promise<PriceModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: DeactivatePriceDTO): Promise<PriceModel> {
    return await this.commandBus.execute(new DeactivatePriceCommand(data));
  }
}
