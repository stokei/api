import { ICommand } from '@nestjs/cqrs';

import { CreatePaymentMethodCardDTO } from '@/dtos/payment-methods/create-payment-method-card.dto';

export class CreatePaymentMethodCardCommand
  implements ICommand, CreatePaymentMethodCardDTO
{
  parent?: string;
  stripePaymentMethod?: string;
  lastFourCardNumber?: string;
  cardBrand?: string;
  cardExpiryMonth?: string;
  cardExpiryYear?: string;
  app: string;
  createdBy: string;

  constructor(data: CreatePaymentMethodCardDTO) {
    this.parent = data.parent;
    this.stripePaymentMethod = data.stripePaymentMethod;
    this.lastFourCardNumber = data.lastFourCardNumber;
    this.cardBrand = data.cardBrand;
    this.cardExpiryMonth = data.cardExpiryMonth;
    this.cardExpiryYear = data.cardExpiryYear;
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
