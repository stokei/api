import { ICommand } from '@nestjs/cqrs';

import {
  RemoveOrderDTO,
  RemoveOrderWhereDTO
} from '@/dtos/orders/remove-order.dto';

export class RemoveOrderCommand implements ICommand, RemoveOrderDTO {
  where: RemoveOrderWhereDTO;
  constructor(data: RemoveOrderDTO) {
    this.where = data.where;
  }
}
