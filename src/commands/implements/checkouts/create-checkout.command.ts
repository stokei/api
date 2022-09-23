import { ICommand } from '@nestjs/cqrs';

import { CreateCheckoutDTO } from '@/dtos/checkouts/create-checkout.dto';

export class CreateCheckoutCommand implements ICommand, CreateCheckoutDTO {
  fromApp: string;
  customer: string;
  price: string;
  createdBy: string;

  constructor(data: CreateCheckoutDTO) {
    this.fromApp = data.fromApp;
    this.customer = data.customer;
    this.price = data.price;
    this.createdBy = data.createdBy;
  }
}
