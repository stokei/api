import { ICommand } from '@nestjs/cqrs';
import {
  UpdatePriceDTO,
  UpdatePriceDataDTO,
  UpdatePriceWhereDTO
} from '@/dtos/prices/update-price.dto';

export class UpdatePriceCommand implements ICommand, UpdatePriceDTO {
  data: UpdatePriceDataDTO;
  where: UpdatePriceWhereDTO;
  constructor(data: UpdatePriceDTO) {
    this.data = data.data;
    this.where = data.where;
  }
}
