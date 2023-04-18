import { ICommand } from '@nestjs/cqrs';

import { CreateAppCatalogDTO } from '@/dtos/apps/create-app-catalog.dto';

export class CreateAppCatalogCommand implements ICommand, CreateAppCatalogDTO {
  app: string;
  createdBy: string;

  constructor(data: CreateAppCatalogDTO) {
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
