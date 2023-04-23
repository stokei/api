import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { UpdatePriceTierCommand } from '@/commands/implements/price-tiers/update-price-tier.command';
import { UpdatePriceTierDTO } from '@/dtos/price-tiers/update-price-tier.dto';
import { PriceTierModel } from '@/models/price-tier.model';

@Injectable()
export class UpdatePriceTierService
  implements IBaseService<UpdatePriceTierDTO, Promise<PriceTierModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: UpdatePriceTierDTO): Promise<PriceTierModel> {
    return await this.commandBus.execute(new UpdatePriceTierCommand(data));
  }
}
