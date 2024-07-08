import { ICommand } from '@nestjs/cqrs';

import { CreateCheckoutDTO } from '@/dtos/checkouts/create-checkout.dto';
import { PaymentGatewayType } from '@/enums/payment-gateway-type.enum';

export class CreateCheckoutCommand implements ICommand, CreateCheckoutDTO {
  successURL: string;
  cancelURL: string;
  paymentGatewayType: PaymentGatewayType;
  app: string;
  customer: string;
  order: string;
  createdBy: string;

  constructor(data: CreateCheckoutDTO) {
    this.successURL = data.successURL;
    this.cancelURL = data.cancelURL;
    this.paymentGatewayType = data.paymentGatewayType;
    this.app = data.app;
    this.customer = data.customer;
    this.order = data.order;
    this.createdBy = data.createdBy;
  }
}
