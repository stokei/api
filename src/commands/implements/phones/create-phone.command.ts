import { ICommand } from '@nestjs/cqrs';

import { CreatePhoneDTO } from '@/dtos/phones/create-phone.dto';

export class CreatePhoneCommand implements ICommand, CreatePhoneDTO {
  parent: string;
  countryCode: string;
  areaCode: string;
  number: string;
  default?: boolean;
  createdBy: string;

  constructor(data: CreatePhoneDTO) {
    this.parent = data.parent;
    this.countryCode = data.countryCode;
    this.areaCode = data.areaCode;
    this.number = data.number;
    this.default = data.default;
    this.createdBy = data.createdBy;
  }
}
