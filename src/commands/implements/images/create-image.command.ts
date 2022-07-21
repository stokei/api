import { ICommand } from '@nestjs/cqrs';

import { CreateImageDTO } from '@/dtos/images/create-image.dto';

export class CreateImageCommand implements ICommand, CreateImageDTO {
  path: string;
  createdBy: string;

  constructor(data: CreateImageDTO) {
    this.path = data.path;
    this.createdBy = data.createdBy;
  }
}
