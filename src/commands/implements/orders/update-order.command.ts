import { ICommand } from '@nestjs/cqrs';

import {
  UpdateOrderDataDTO,
  UpdateOrderDTO,
  UpdateOrderWhereDTO
} from '@/dtos/orders/update-order.dto';

export class UpdateOrderCommand implements ICommand, UpdateOrderDTO {
  data: UpdateOrderDataDTO;
  where: UpdateOrderWhereDTO;
  constructor(data: UpdateOrderDTO) {
    this.data = data.data;
    this.where = data.where;
  }
}
