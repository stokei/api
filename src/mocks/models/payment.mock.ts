import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

import { IPaymentModelData, PaymentModel } from '@/models/payment.model';

export class PaymentModelMock extends PaymentModel {
  constructor(data?: Partial<IPaymentModelData>) {
    super({
      _id: nanoid(),
      name: data?.name ?? 'Payment Name',
      parent: data?.parent ?? 'anyParent',
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null
    });
  }
}
