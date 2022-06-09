import { ICommand } from '@nestjs/cqrs';

import { CreatePageDTO } from '@/dtos/pages/create-page.dto';

export class CreatePageCommand implements ICommand, CreatePageDTO {
  name: string;
  parent: string;

  constructor(data: CreatePageDTO) {
    this.name = data.name;
    this.parent = data.parent;
  }
}
