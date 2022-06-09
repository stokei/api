import { ICommand } from '@nestjs/cqrs';

import { CreateProductsImageDTO } from '@/dtos/products-images/create-products-image.dto';

export class CreateProductsImageCommand
  implements ICommand, CreateProductsImageDTO
{
  name: string;
  parent: string;

  constructor(data: CreateProductsImageDTO) {
    this.name = data.name;
    this.parent = data.parent;
  }
}
