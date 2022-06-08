import { CreatePriceCommand } from '@/commands/implements/prices/create-price.command';
import { CreatePriceDTO } from '@/dtos/prices/create-price.dto';
import { PriceModel } from '@/models/price.model';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

@Injectable()
export class CreatePriceService
  implements IBaseService<CreatePriceDTO, Promise<PriceModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreatePriceDTO): Promise<PriceModel> {
    return await this.commandBus.execute(new CreatePriceCommand(data));
  }
}
