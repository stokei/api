import { ICommand } from '@nestjs/cqrs';

import { CreateModuleDTO } from '@/dtos/modules/create-module.dto';

export class CreateModuleCommand implements ICommand, CreateModuleDTO {
  name: string;
  parent: string;
  createdBy: string;

  constructor(data: CreateModuleDTO) {
    this.name = data.name;
    this.parent = data.parent;
    this.createdBy = data.createdBy;
  }
}
