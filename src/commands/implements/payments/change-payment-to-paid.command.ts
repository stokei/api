import { ICommand } from '@nestjs/cqrs';

import { ChangePaymentToPaidDTO } from '@/dtos/payments/change-payment-to-paid.dto';

export class ChangePaymentToPaidCommand
  implements ICommand, ChangePaymentToPaidDTO
{
  app: string;
  payment: string;
  paymentUrl: string;
  paymentMethod: string;
  updatedBy: string;

  constructor(data: ChangePaymentToPaidDTO) {
    this.app = data.app;
    this.payment = data.payment;
    this.paymentUrl = data.paymentUrl;
    this.paymentMethod = data.paymentMethod;
    this.updatedBy = data.updatedBy;
  }
}
