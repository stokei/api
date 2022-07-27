import { ICommand } from '@nestjs/cqrs';

import { CreateDomainDTO } from '@/dtos/domains/create-domain.dto';

export class CreateDomainCommand implements ICommand, CreateDomainDTO {
  parent: string;
  name: string;
  app: string;
  createdBy: string;

  constructor(data: CreateDomainDTO) {
    this.parent = data.parent;
    this.name = data.name;
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
