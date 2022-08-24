import { ICommand } from '@nestjs/cqrs';

import {
  CreateCheckoutSessionDTO,
  CreateCheckoutSessionPriceDTO
} from '@/dtos/checkouts/create-checkout-session.dto';

export class CreateCheckoutSessionCommand
  implements ICommand, CreateCheckoutSessionDTO
{
  app: string;
  customer: string;
  prices: CreateCheckoutSessionPriceDTO[];
  createdBy: string;

  constructor(data: CreateCheckoutSessionDTO) {
    this.app = data.app;
    this.customer = data.customer;
    this.prices = data.prices;
    this.createdBy = data.createdBy;
  }
}
