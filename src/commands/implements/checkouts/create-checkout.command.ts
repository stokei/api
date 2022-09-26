import { ICommand } from '@nestjs/cqrs';

import { CreateCheckoutDTO } from '@/dtos/checkouts/create-checkout.dto';

export class CreateCheckoutCommand implements ICommand, CreateCheckoutDTO {
  app: string;
  customer: string;
  price: string;
  createdBy: string;

  constructor(data: CreateCheckoutDTO) {
    this.app = data.app;
    this.customer = data.customer;
    this.price = data.price;
    this.createdBy = data.createdBy;
  }
}
