import { ICommand } from '@nestjs/cqrs';

import { CreateMaterialDTO } from '@/dtos/materials/create-material.dto';

export class CreateMaterialCommand implements ICommand, CreateMaterialDTO {
  parent: string;
  name: string;
  file: string;
  description?: string;
  avatar?: string;
  free?: boolean;
  app: string;
  createdBy: string;

  constructor(data: CreateMaterialDTO) {
    this.parent = data.parent;
    this.file = data.file;
    this.name = data.name;
    this.free = data.free;
    this.description = data.description;
    this.avatar = data.avatar;
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
