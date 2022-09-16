import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

import {
  IPaymentMethodModelData,
  PaymentMethodModel
} from '@/models/payment-method.model';

export class PaymentMethodModelMock extends PaymentMethodModel {
  constructor(data?: Partial<IPaymentMethodModelData>) {
    super({
      _id: nanoid(),
      parent: data?.parent ?? 'anyParent',
      stripePaymentMethod:
        data?.stripePaymentMethod ?? 'anyExternalPaymentMethodId',
      cardBrand: data?.cardBrand ?? 'visa',
      lastFourCardNumber: data?.lastFourCardNumber ?? '4445',
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null,
      app: data?.app ?? 'apps.anyApp',
      createdBy: data?.createdBy ?? 'accounts.anyAccount',
      updatedBy: data?.updatedBy ?? 'accounts.anyAccount'
    });
  }
}
