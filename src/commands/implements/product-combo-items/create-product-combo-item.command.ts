import { ICommand } from '@nestjs/cqrs';

import { CreateProductComboItemDTO } from '@/dtos/product-combo-items/create-product-combo-item.dto';

export class CreateProductComboItemCommand
  implements ICommand, CreateProductComboItemDTO
{
  product: string;
  parent: string;
  app: string;
  createdBy: string;

  constructor(data: CreateProductComboItemDTO) {
    this.product = data.product;
    this.parent = data.parent;
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
