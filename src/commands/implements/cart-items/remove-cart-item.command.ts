import { ICommand } from '@nestjs/cqrs';

import {
  RemoveCartItemDTO,
  RemoveCartItemWhereDTO
} from '@/dtos/cart-items/remove-cart-item.dto';

export class RemoveCartItemCommand implements ICommand, RemoveCartItemDTO {
  where: RemoveCartItemWhereDTO;
  constructor(data: RemoveCartItemDTO) {
    this.where = data.where;
  }
}
