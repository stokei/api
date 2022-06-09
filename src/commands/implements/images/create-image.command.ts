import { ICommand } from '@nestjs/cqrs';

import { CreateImageDTO } from '@/dtos/images/create-image.dto';

export class CreateImageCommand implements ICommand, CreateImageDTO {
  name: string;
  parent: string;

  constructor(data: CreateImageDTO) {
    this.name = data.name;
    this.parent = data.parent;
  }
}
