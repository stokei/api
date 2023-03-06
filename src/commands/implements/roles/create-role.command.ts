import { ICommand } from '@nestjs/cqrs';

import { CreateRoleDTO } from '@/dtos/roles/create-role.dto';

export class CreateRoleCommand implements ICommand, CreateRoleDTO {
  parent: string;
  name: string;
  app: string;
  createdBy: string;

  constructor(data: CreateRoleDTO) {
    this.parent = data.parent;
    this.name = data.name;
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
