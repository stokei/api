import { ICommand } from '@nestjs/cqrs';

import { CreateProductDTO } from '@/dtos/products/create-product.dto';

export class CreateProductCommand implements ICommand, CreateProductDTO {
  parent: string;
  name: string;
  description?: string;
  project: string;
  externalProductId: string;
  checkoutVisible: boolean;
  avatar?: string;
  createdBy: string;

  constructor(data: CreateProductDTO) {
    this.parent = data.parent;
    this.name = data.name;
    this.description = data.description;
    this.project = data.project;
    this.externalProductId = data.externalProductId;
    this.checkoutVisible = data.checkoutVisible;
    this.avatar = data.avatar;
    this.createdBy = data.createdBy;
  }
}
