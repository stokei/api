import { ICommand } from '@nestjs/cqrs';

import { CreatePaymentMethodCardByCardHashDTO } from '@/dtos/payment-methods/create-payment-method-card-by-card-hash.dto';

export class CreatePaymentMethodCardByCardHashCommand
  implements ICommand, CreatePaymentMethodCardByCardHashDTO
{
  parent: string;
  cardHash: string;
  address: string;
  app: string;
  createdBy: string;

  constructor(data: CreatePaymentMethodCardByCardHashDTO) {
    this.parent = data.parent;
    this.cardHash = data.cardHash;
    this.address = data.address;
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
