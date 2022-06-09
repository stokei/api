import { ICommand } from '@nestjs/cqrs';

import {
  RemoveCartDTO,
  RemoveCartWhereDTO
} from '@/dtos/carts/remove-cart.dto';

export class RemoveCartCommand implements ICommand, RemoveCartDTO {
  where: RemoveCartWhereDTO;
  constructor(data: RemoveCartDTO) {
    this.where = data.where;
  }
}
