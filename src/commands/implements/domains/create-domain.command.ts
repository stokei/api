import { ICommand } from '@nestjs/cqrs';

import { CreateDomainDTO } from '@/dtos/domains/create-domain.dto';

export class CreateDomainCommand implements ICommand, CreateDomainDTO {
  parent: string;
  fulldomain: string;
  default?: boolean;
  language: string;
  app: string;
  createdBy: string;

  constructor(data: CreateDomainDTO) {
    this.parent = data.parent;
    this.fulldomain = data.fulldomain;
    this.default = data.default;
    this.language = data.language;
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
