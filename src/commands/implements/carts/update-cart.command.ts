import { ICommand } from '@nestjs/cqrs';

import {
  UpdateCartDataDTO,
  UpdateCartDTO,
  UpdateCartWhereDTO
} from '@/dtos/carts/update-cart.dto';

export class UpdateCartCommand implements ICommand, UpdateCartDTO {
  data: UpdateCartDataDTO;
  where: UpdateCartWhereDTO;
  constructor(data: UpdateCartDTO) {
    this.data = data.data;
    this.where = data.where;
  }
}
