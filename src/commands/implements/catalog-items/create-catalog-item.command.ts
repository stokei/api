import { ICommand } from '@nestjs/cqrs';

import { CreateCatalogItemDTO } from '@/dtos/catalog-items/create-catalog-item.dto';

export class CreateCatalogItemCommand
  implements ICommand, CreateCatalogItemDTO
{
  product: string;
  catalog: string;
  app: string;
  createdBy: string;

  constructor(data: CreateCatalogItemDTO) {
    this.product = data.product;
    this.catalog = data.catalog;
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
