import { ICommand } from '@nestjs/cqrs';

import { CreateCheckoutDTO } from '@/dtos/checkouts/create-checkout.dto';
import { PaymentMethodType } from '@/enums/payment-method-type.enum';

export class CreatePagarmeCheckoutCommand
  implements ICommand, CreateCheckoutDTO
{
  paymentMethod?: string;
  paymentMethodType: PaymentMethodType;
  app: string;
  customer: string;
  order: string;
  createdBy: string;

  constructor(data: CreateCheckoutDTO) {
    this.paymentMethodType = data.paymentMethodType;
    this.app = data.app;
    this.customer = data.customer;
    this.order = data.order;
    this.paymentMethod = data.paymentMethod;
    this.createdBy = data.createdBy;
  }
}
