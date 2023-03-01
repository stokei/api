import { ICommand } from '@nestjs/cqrs';

import { CreateCatalogDTO } from '@/dtos/catalogs/create-catalog.dto';

export class CreateCatalogCommand implements ICommand, CreateCatalogDTO {
  app: string;
  parent: string;
  title: string;
  subtitle?: string;
  createdBy: string;

  constructor(data: CreateCatalogDTO) {
    this.app = data.app;
    this.parent = data.parent;
    this.title = data.title;
    this.subtitle = data.subtitle;
    this.createdBy = data.createdBy;
  }
}
