import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

import { CheckoutModel, ICheckoutModelData } from '@/models/checkout.model';

export class CheckoutModelMock extends CheckoutModel {
  constructor(data?: Partial<ICheckoutModelData>) {
    super({
      _id: nanoid(),
      name: data?.name ?? 'Checkout Name',
      parent: data?.parent ?? 'anyParent',
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null
    });
  }
}
