import { ICommand } from '@nestjs/cqrs';

import { CreateDomainDTO } from '@/dtos/domains/create-domain.dto';

export class CreateDomainCommand implements ICommand, CreateDomainDTO {
  parent: string;
  name: string;
  default?: boolean;
  app: string;
  createdBy: string;

  constructor(data: CreateDomainDTO) {
    this.parent = data.parent;
    this.name = data.name;
    this.default = data.default;
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
