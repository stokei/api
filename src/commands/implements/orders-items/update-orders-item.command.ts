import { ICommand } from '@nestjs/cqrs';

import {
  UpdateOrdersItemDataDTO,
  UpdateOrdersItemDTO,
  UpdateOrdersItemWhereDTO
} from '@/dtos/orders-items/update-orders-item.dto';

export class UpdateOrdersItemCommand implements ICommand, UpdateOrdersItemDTO {
  data: UpdateOrdersItemDataDTO;
  where: UpdateOrdersItemWhereDTO;
  constructor(data: UpdateOrdersItemDTO) {
    this.data = data.data;
    this.where = data.where;
  }
}
