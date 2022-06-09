import { ICommand } from '@nestjs/cqrs';

import { CreateProductsTagDTO } from '@/dtos/products-tags/create-products-tag.dto';

export class CreateProductsTagCommand
  implements ICommand, CreateProductsTagDTO
{
  name: string;
  parent: string;

  constructor(data: CreateProductsTagDTO) {
    this.name = data.name;
    this.parent = data.parent;
  }
}
