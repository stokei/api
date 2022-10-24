import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { RemovePriceTierCommand } from '@/commands/implements/price-tiers/remove-price-tier.command';
import { RemovePriceTierDTO } from '@/dtos/price-tiers/remove-price-tier.dto';
import { PriceTierModel } from '@/models/price-tier.model';

@Injectable()
export class RemovePriceTierService
  implements IBaseService<RemovePriceTierDTO, Promise<PriceTierModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: RemovePriceTierDTO): Promise<PriceTierModel> {
    return await this.commandBus.execute(new RemovePriceTierCommand(data));
  }
}
