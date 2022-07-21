import { ICommand } from '@nestjs/cqrs';

import { CreateProjectDTO } from '@/dtos/projects/create-project.dto';

export class CreateProjectCommand implements ICommand, CreateProjectDTO {
  parent: string;
  name: string;
  currency: string;
  createdBy: string;

  constructor(data: CreateProjectDTO) {
    this.name = data.name;
    this.parent = data.parent;
    this.currency = data.currency;
    this.createdBy = data.createdBy;
  }
}
