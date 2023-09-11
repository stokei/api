import { ICommand } from '@nestjs/cqrs';

import { CreateSiteDTO } from '@/dtos/sites/create-site.dto';

export class CreateSiteCommand implements ICommand, CreateSiteDTO {
  parent: string;
  name: string;
  slug: string;
  app: string;
  createdBy: string;

  constructor(data: CreateSiteDTO) {
    this.parent = data.parent;
    this.name = data.name;
    this.slug = data.slug;
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
