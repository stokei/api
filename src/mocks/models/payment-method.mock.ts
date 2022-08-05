import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

import { PaymentMethodProvider } from '@/enums/payment-method-provider.enum';
import { PaymentMethodType } from '@/enums/payment-method-type.enum';
import {
  IPaymentMethodModelData,
  PaymentMethodModel
} from '@/models/payment-method.model';

export class PaymentMethodModelMock extends PaymentMethodModel {
  constructor(data?: Partial<IPaymentMethodModelData>) {
    super({
      _id: nanoid(),
      parent: data?.parent ?? 'anyParent',
      type: data?.type ?? PaymentMethodType.CREDIT_CARD,
      provider: data?.provider ?? PaymentMethodProvider.STRIPE,
      externalPaymentMethod:
        data?.externalPaymentMethod ?? 'anyExternalPaymentMethodId',
      cardBrand: data?.cardBrand ?? 'visa',
      lastFourCardNumber: data?.lastFourCardNumber ?? '4445',
      active: data?.active ?? true,
      activatedAt: data?.activatedAt ?? null,
      deactivatedAt: data?.deactivatedAt ?? null,
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null,
      app: data?.app ?? 'apps.anyApp',
      createdBy: data?.createdBy ?? 'accounts.anyAccount',
      updatedBy: data?.updatedBy ?? 'accounts.anyAccount'
    });
  }
}