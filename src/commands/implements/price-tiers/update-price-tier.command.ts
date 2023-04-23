import { ICommand } from '@nestjs/cqrs';

import {
  UpdatePriceTierDataDTO,
  UpdatePriceTierDTO,
  UpdatePriceTierWhereDTO
} from '@/dtos/price-tiers/update-price-tier.dto';

export class UpdatePriceTierCommand implements ICommand, UpdatePriceTierDTO {
  data: UpdatePriceTierDataDTO;
  where: UpdatePriceTierWhereDTO;
  constructor(data: UpdatePriceTierDTO) {
    this.data = data.data;
    this.where = data.where;
  }
}
