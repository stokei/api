import { ICommand } from '@nestjs/cqrs';

import {
  RemoveCartsItemDTO,
  RemoveCartsItemWhereDTO
} from '@/dtos/carts-items/remove-carts-item.dto';

export class RemoveCartsItemCommand implements ICommand, RemoveCartsItemDTO {
  where: RemoveCartsItemWhereDTO;
  constructor(data: RemoveCartsItemDTO) {
    this.where = data.where;
  }
}
