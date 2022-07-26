import { ICommand } from '@nestjs/cqrs';

import { CreateImageDTO } from '@/dtos/images/create-image.dto';

export class CreateImageCommand implements ICommand, CreateImageDTO {
  path: string;
  app: string;
  createdBy: string;

  constructor(data: CreateImageDTO) {
    this.path = data.path;
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
