import { ICommand } from '@nestjs/cqrs';

import { CreatePhoneDTO } from '@/dtos/phones/create-phone.dto';

export class CreatePhoneCommand implements ICommand, CreatePhoneDTO {
  name: string;
  parent: string;
  createdBy: string;

  constructor(data: CreatePhoneDTO) {
    this.name = data.name;
    this.parent = data.parent;
    this.createdBy = data.createdBy;
  }
}
