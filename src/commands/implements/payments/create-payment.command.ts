import { ICommand } from '@nestjs/cqrs';

import { CreatePaymentDTO } from '@/dtos/payments/create-payment.dto';

export class CreatePaymentCommand implements ICommand, CreatePaymentDTO {
  customer: string;
  order: string;
  paymentMethod: string;
  app: string;
  createdBy: string;

  constructor(data: CreatePaymentDTO) {
    this.customer = data.customer;
    this.order = data.order;
    this.paymentMethod = data.paymentMethod;
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
