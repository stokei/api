import { ICommand } from '@nestjs/cqrs';

import { CreateVersionDTO } from '@/dtos/versions/create-version.dto';

export class CreateVersionCommand implements ICommand, CreateVersionDTO {
  parent: string;
  app: string;
  createdBy: string;

  constructor(data: CreateVersionDTO) {
    this.parent = data.parent;
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
