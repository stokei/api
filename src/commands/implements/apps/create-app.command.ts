import { ICommand } from '@nestjs/cqrs';

import { CreateAppDTO } from '@/dtos/apps/create-app.dto';

export class CreateAppCommand implements ICommand, CreateAppDTO {
  parent: string;
  name: string;
  currency: string;
  app: string;
  createdBy: string;

  constructor(data: CreateAppDTO) {
    this.name = data.name;
    this.parent = data.parent;
    this.currency = data.currency;
    this.createdBy = data.createdBy;
  }
}
