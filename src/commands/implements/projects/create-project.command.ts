import { ICommand } from '@nestjs/cqrs';

import { CreateProjectDTO } from '@/dtos/projects/create-project.dto';

export class CreateProjectCommand implements ICommand, CreateProjectDTO {
  name: string;
  parent: string;
  createdBy: string;

  constructor(data: CreateProjectDTO) {
    this.name = data.name;
    this.parent = data.parent;
    this.createdBy = data.createdBy;
  }
}
