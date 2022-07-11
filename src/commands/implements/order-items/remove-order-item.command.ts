import { ICommand } from '@nestjs/cqrs';

import {
  RemoveOrderItemDTO,
  RemoveOrderItemWhereDTO
} from '@/dtos/order-items/remove-order-item.dto';

export class RemoveOrderItemCommand implements ICommand, RemoveOrderItemDTO {
  where: RemoveOrderItemWhereDTO;
  constructor(data: RemoveOrderItemDTO) {
    this.where = data.where;
  }
}
