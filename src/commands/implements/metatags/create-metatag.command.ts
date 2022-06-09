import { ICommand } from '@nestjs/cqrs';

import { CreateMetatagDTO } from '@/dtos/metatags/create-metatag.dto';

export class CreateMetatagCommand implements ICommand, CreateMetatagDTO {
  name: string;
  parent: string;

  constructor(data: CreateMetatagDTO) {
    this.name = data.name;
    this.parent = data.parent;
  }
}
