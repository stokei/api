import { ICommand } from '@nestjs/cqrs';

import {
  RemoveProductsImageDTO,
  RemoveProductsImageWhereDTO
} from '@/dtos/products-images/remove-products-image.dto';

export class RemoveProductsImageCommand
  implements ICommand, RemoveProductsImageDTO
{
  where: RemoveProductsImageWhereDTO;
  constructor(data: RemoveProductsImageDTO) {
    this.where = data.where;
  }
}
