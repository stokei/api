import { ICommand } from '@nestjs/cqrs';

import { CreateProductDTO } from '@/dtos/products/create-product.dto';

export class CreateProductCommand implements ICommand, CreateProductDTO {
  name: string;
  parent: string;
  createdBy: string;

  constructor(data: CreateProductDTO) {
    this.name = data.name;
    this.parent = data.parent;
    this.createdBy = data.createdBy;
  }
}
