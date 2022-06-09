import { ICommand } from '@nestjs/cqrs';

import {
  RemovePriceDTO,
  RemovePriceWhereDTO
} from '@/dtos/prices/remove-price.dto';

export class RemovePriceCommand implements ICommand, RemovePriceDTO {
  where: RemovePriceWhereDTO;
  constructor(data: RemovePriceDTO) {
    this.where = data.where;
  }
}
