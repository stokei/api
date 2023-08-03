import { ICommand } from '@nestjs/cqrs';

import { CreatePixCheckoutDTO } from '@/dtos/checkouts/create-pix-checkout.dto';

export class CreatePagarmeCheckoutCommand
  implements ICommand, CreatePixCheckoutDTO
{
  app: string;
  customer: string;
  price: string;
  createdBy: string;

  constructor(data: CreatePixCheckoutDTO) {
    this.app = data.app;
    this.customer = data.customer;
    this.price = data.price;
    this.createdBy = data.createdBy;
  }
}
