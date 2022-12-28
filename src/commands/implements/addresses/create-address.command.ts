import { ICommand } from '@nestjs/cqrs';

import { CreateAddressDTO } from '@/dtos/addresses/create-address.dto';

export class CreateAddressCommand implements ICommand, CreateAddressDTO {
  parent: string;
  street: string;
  complement?: string;
  number: string;
  city: string;
  country: string;
  state: string;
  postalCode: string;
  app: string;
  createdBy: string;

  constructor(data: CreateAddressDTO) {
    this.parent = data.parent;
    this.street = data.street;
    this.complement = data.complement;
    this.number = data.number;
    this.city = data.city;
    this.country = data.country;
    this.state = data.state;
    this.postalCode = data.postalCode;
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
