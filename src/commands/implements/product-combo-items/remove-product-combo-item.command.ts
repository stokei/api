import { ICommand } from '@nestjs/cqrs';

import {
  RemoveProductComboItemDTO,
  RemoveProductComboItemWhereDTO
} from '@/dtos/product-combo-items/remove-product-combo-item.dto';

export class RemoveProductComboItemCommand
  implements ICommand, RemoveProductComboItemDTO
{
  where: RemoveProductComboItemWhereDTO;
  constructor(data: RemoveProductComboItemDTO) {
    this.where = data.where;
  }
}
