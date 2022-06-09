import { ICommand } from '@nestjs/cqrs';

import {
  RemoveProductDTO,
  RemoveProductWhereDTO
} from '@/dtos/products/remove-product.dto';

export class RemoveProductCommand implements ICommand, RemoveProductDTO {
  where: RemoveProductWhereDTO;
  constructor(data: RemoveProductDTO) {
    this.where = data.where;
  }
}
