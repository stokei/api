import { ICommand } from '@nestjs/cqrs';

import { CreatePhoneDTO } from '@/dtos/phones/create-phone.dto';

export class CreatePhoneCommand implements ICommand, CreatePhoneDTO {
  parent: string;
  countryCode: string;
  areaCode: string;
  number: string;
  app: string;
  createdBy: string;

  constructor(data: CreatePhoneDTO) {
    this.parent = data.parent;
    this.countryCode = data.countryCode;
    this.areaCode = data.areaCode;
    this.number = data.number;
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
