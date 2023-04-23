import { ICommand } from '@nestjs/cqrs';

import { CreateAppDTO } from '@/dtos/apps/create-app.dto';

export class CreateAppCommand implements ICommand, CreateAppDTO {
  id?: string;
  parent: string;
  slug?: string;
  name: string;
  email: string;
  currency: string;
  language: string;
  app: string;
  createdBy: string;

  constructor(data: CreateAppDTO) {
    this.id = data.id;
    this.name = data.name;
    this.slug = data.slug;
    this.email = data.email;
    this.parent = data.parent;
    this.language = data.language;
    this.currency = data.currency;
    this.createdBy = data.createdBy;
  }
}
