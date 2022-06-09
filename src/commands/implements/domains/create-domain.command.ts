import { ICommand } from '@nestjs/cqrs';

import { CreateDomainDTO } from '@/dtos/domains/create-domain.dto';

export class CreateDomainCommand implements ICommand, CreateDomainDTO {
  name: string;
  parent: string;

  constructor(data: CreateDomainDTO) {
    this.name = data.name;
    this.parent = data.parent;
  }
}
