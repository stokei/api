import { ICommand } from '@nestjs/cqrs';

import { CreateAccessDTO } from '@/dtos/accesses/create-access.dto';

export class CreateAccessCommand implements ICommand, CreateAccessDTO {
  parent: string;
  createdBy: string;

  constructor(data: CreateAccessDTO) {
    this.parent = data.parent;
    this.createdBy = data.createdBy;
  }
}
