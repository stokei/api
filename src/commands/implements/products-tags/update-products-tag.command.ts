import { ICommand } from '@nestjs/cqrs';

import {
  UpdateProductsTagDataDTO,
  UpdateProductsTagDTO,
  UpdateProductsTagWhereDTO
} from '@/dtos/products-tags/update-products-tag.dto';

export class UpdateProductsTagCommand
  implements ICommand, UpdateProductsTagDTO
{
  data: UpdateProductsTagDataDTO;
  where: UpdateProductsTagWhereDTO;
  constructor(data: UpdateProductsTagDTO) {
    this.data = data.data;
    this.where = data.where;
  }
}
