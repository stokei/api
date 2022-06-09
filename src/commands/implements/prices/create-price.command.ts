import { ICommand } from '@nestjs/cqrs';

import { CreatePriceDTO } from '@/dtos/prices/create-price.dto';

export class CreatePriceCommand implements ICommand, CreatePriceDTO {
  name: string;
  parent: string;

  constructor(data: CreatePriceDTO) {
    this.name = data.name;
    this.parent = data.parent;
  }
}
