import { ICommand } from '@nestjs/cqrs';

import { CreateFeatureDTO } from '@/dtos/features/create-feature.dto';

export class CreateFeatureCommand implements ICommand, CreateFeatureDTO {
  app: string;
  parent: string;
  name: string;
  description?: string;
  createdBy: string;

  constructor(data: CreateFeatureDTO) {
    this.app = data.app;
    this.parent = data.parent;
    this.name = data.name;
    this.description = data.description;
    this.createdBy = data.createdBy;
  }
}
