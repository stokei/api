import { ICommand } from '@nestjs/cqrs';

import { CreateAddressDTO } from '@/dtos/addresses/create-address.dto';

export class CreateAddressCommand implements ICommand, CreateAddressDTO {
  parent: string;
  default: boolean;
  street: string;
  complement?: string;
  number: string;
  city: string;
  country: string;
  state: string;
  postalCode: string;
  createdBy: string;

  constructor(data: CreateAddressDTO) {
    this.parent = data.parent;
    this.default = data.default;
    this.street = data.street;
    this.complement = data.complement;
    this.number = data.number;
    this.city = data.city;
    this.country = data.country;
    this.state = data.state;
    this.postalCode = data.postalCode;
    this.createdBy = data.createdBy;
  }
}
