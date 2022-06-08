import { RemovePriceCommand } from '@/commands/implements/prices/remove-price.command';
import { RemovePriceDTO } from '@/dtos/prices/remove-price.dto';
import { PriceModel } from '@/models/price.model';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

@Injectable()
export class RemovePriceService
  implements IBaseService<RemovePriceDTO, Promise<PriceModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: RemovePriceDTO): Promise<PriceModel> {
    return await this.commandBus.execute(new RemovePriceCommand(data));
  }
}
