import { ICommand } from '@nestjs/cqrs';

import { ConfirmCheckoutDTO } from '@/dtos/checkouts/confirm-checkout.dto';

export class ConfirmCheckoutCommand implements ICommand, ConfirmCheckoutDTO {
  app: string;
  subscription: string;
  paymentMethod: string;
  createdBy: string;

  constructor(data: ConfirmCheckoutDTO) {
    this.app = data.app;
    this.subscription = data.subscription;
    this.paymentMethod = data.paymentMethod;
    this.createdBy = data.createdBy;
  }
}
