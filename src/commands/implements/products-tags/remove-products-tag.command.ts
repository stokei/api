import { ICommand } from '@nestjs/cqrs';

import {
  RemoveProductsTagDTO,
  RemoveProductsTagWhereDTO
} from '@/dtos/products-tags/remove-products-tag.dto';

export class RemoveProductsTagCommand
  implements ICommand, RemoveProductsTagDTO
{
  where: RemoveProductsTagWhereDTO;
  constructor(data: RemoveProductsTagDTO) {
    this.where = data.where;
  }
}
