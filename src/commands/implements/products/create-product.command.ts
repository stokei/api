import { ICommand } from '@nestjs/cqrs';

import { CreateProductDTO } from '@/dtos/products/create-product.dto';
import { ProductType } from '@/enums/product-type.enum';

export class CreateProductCommand implements ICommand, CreateProductDTO {
  parent: string;
  name: string;
  type: ProductType;
  externalReference?: string;
  description?: string;
  app: string;
  avatar?: string;
  createdBy: string;
  catalogs?: string[];
  comboProducts?: string[];

  constructor(data: CreateProductDTO) {
    this.parent = data.parent;
    this.name = data.name;
    this.type = data.type;
    this.externalReference = data.externalReference;
    this.description = data.description;
    this.app = data.app;
    this.avatar = data.avatar;
    this.catalogs = data.catalogs;
    this.comboProducts = data.comboProducts;
    this.createdBy = data.createdBy;
  }
}
