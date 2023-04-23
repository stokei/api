import { ICommand } from '@nestjs/cqrs';

import { CreateImageDTO } from '@/dtos/images/create-image.dto';

export class CreateImageCommand implements ICommand, CreateImageDTO {
  file: string;
  app: string;
  createdBy: string;

  constructor(data: CreateImageDTO) {
    this.file = data.file;
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
