import { ICommand } from '@nestjs/cqrs';

import {
  RemoveOrdersItemDTO,
  RemoveOrdersItemWhereDTO
} from '@/dtos/orders-items/remove-orders-item.dto';

export class RemoveOrdersItemCommand implements ICommand, RemoveOrdersItemDTO {
  where: RemoveOrdersItemWhereDTO;
  constructor(data: RemoveOrdersItemDTO) {
    this.where = data.where;
  }
}
