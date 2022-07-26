import { ICommand } from '@nestjs/cqrs';

import { CreateProductDTO } from '@/dtos/products/create-product.dto';

export class CreateProductCommand implements ICommand, CreateProductDTO {
  parent: string;
  name: string;
  description?: string;
  app: string;
  externalProduct: string;
  checkoutVisible: boolean;
  avatar?: string;
  app: string;
  createdBy: string;

  constructor(data: CreateProductDTO) {
    this.parent = data.parent;
    this.name = data.name;
    this.description = data.description;
    this.app = data.app;
    this.externalProduct = data.externalProduct;
    this.checkoutVisible = data.checkoutVisible;
    this.avatar = data.avatar;
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
