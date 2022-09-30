import { ICommand } from '@nestjs/cqrs';

import { CreateImageDTO } from '@/dtos/images/create-image.dto';

export class CreateImageCommand implements ICommand, CreateImageDTO {
  filename: string;
  app: string;
  createdBy: string;

  constructor(data: CreateImageDTO) {
    this.filename = data.filename;
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
