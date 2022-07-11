import { ICommand } from '@nestjs/cqrs';

import {
  UpdateOrderItemDataDTO,
  UpdateOrderItemDTO,
  UpdateOrderItemWhereDTO
} from '@/dtos/order-items/update-order-item.dto';

export class UpdateOrderItemCommand implements ICommand, UpdateOrderItemDTO {
  data: UpdateOrderItemDataDTO;
  where: UpdateOrderItemWhereDTO;
  constructor(data: UpdateOrderItemDTO) {
    this.data = data.data;
    this.where = data.where;
  }
}
