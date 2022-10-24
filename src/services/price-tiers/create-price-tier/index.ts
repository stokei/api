import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CreatePriceTierCommand } from '@/commands/implements/price-tiers/create-price-tier.command';
import { CreatePriceTierDTO } from '@/dtos/price-tiers/create-price-tier.dto';
import { PriceTierModel } from '@/models/price-tier.model';

@Injectable()
export class CreatePriceTierService
  implements IBaseService<CreatePriceTierDTO, Promise<PriceTierModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreatePriceTierDTO): Promise<PriceTierModel> {
    return await this.commandBus.execute(new CreatePriceTierCommand(data));
  }
}
