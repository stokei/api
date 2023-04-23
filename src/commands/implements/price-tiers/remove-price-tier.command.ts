import { ICommand } from '@nestjs/cqrs';

import {
  RemovePriceTierDTO,
  RemovePriceTierWhereDTO
} from '@/dtos/price-tiers/remove-price-tier.dto';

export class RemovePriceTierCommand implements ICommand, RemovePriceTierDTO {
  where: RemovePriceTierWhereDTO;
  constructor(data: RemovePriceTierDTO) {
    this.where = data.where;
  }
}
