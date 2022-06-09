import { ICommand } from '@nestjs/cqrs';

import { CreateTagDTO } from '@/dtos/tags/create-tag.dto';

export class CreateTagCommand implements ICommand, CreateTagDTO {
  name: string;
  parent: string;

  constructor(data: CreateTagDTO) {
    this.name = data.name;
    this.parent = data.parent;
  }
}
