import { ICommand } from '@nestjs/cqrs';

import { CreateAddressDTO } from '@/dtos/addresses/create-address.dto';

export class CreateAddressCommand implements ICommand, CreateAddressDTO {
  name: string;
  parent: string;

  constructor(data: CreateAddressDTO) {
    this.name = data.name;
    this.parent = data.parent;
  }
}
