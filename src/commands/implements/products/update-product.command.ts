import { ICommand } from '@nestjs/cqrs';

import {
  UpdateProductDataDTO,
  UpdateProductDTO,
  UpdateProductWhereDTO
} from '@/dtos/products/update-product.dto';

export class UpdateProductCommand implements ICommand, UpdateProductDTO {
  data: UpdateProductDataDTO;
  where: UpdateProductWhereDTO;
  constructor(data: UpdateProductDTO) {
    this.data = data.data;
    this.where = data.where;
  }
}
