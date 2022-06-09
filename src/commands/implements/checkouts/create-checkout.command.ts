import { ICommand } from '@nestjs/cqrs';

import { CreateCheckoutDTO } from '@/dtos/checkouts/create-checkout.dto';

export class CreateCheckoutCommand implements ICommand, CreateCheckoutDTO {
  name: string;
  parent: string;

  constructor(data: CreateCheckoutDTO) {
    this.name = data.name;
    this.parent = data.parent;
  }
}
