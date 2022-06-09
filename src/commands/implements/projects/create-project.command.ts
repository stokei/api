import { ICommand } from '@nestjs/cqrs';

import { CreateProjectDTO } from '@/dtos/projects/create-project.dto';

export class CreateProjectCommand implements ICommand, CreateProjectDTO {
  name: string;
  parent: string;

  constructor(data: CreateProjectDTO) {
    this.name = data.name;
    this.parent = data.parent;
  }
}
