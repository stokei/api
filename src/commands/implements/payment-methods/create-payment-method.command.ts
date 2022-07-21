import { ICommand } from '@nestjs/cqrs';

import { CreatePaymentMethodDTO } from '@/dtos/payment-methods/create-payment-method.dto';
import { PaymentMethodProvider } from '@/enums/payment-method-provider.enum';
import { PaymentMethodType } from '@/enums/payment-method-type.enum';

export class CreatePaymentMethodCommand
  implements ICommand, CreatePaymentMethodDTO
{
  parent: string;
  type: PaymentMethodType;
  provider: PaymentMethodProvider;
  externalPaymentMethodId: string;
  createdBy: string;

  constructor(data: CreatePaymentMethodDTO) {
    this.parent = data.parent;
    this.type = data.type;
    this.provider = data.provider;
    this.externalPaymentMethodId = data.externalPaymentMethodId;
    this.createdBy = data.createdBy;
  }
}
