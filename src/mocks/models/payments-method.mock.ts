import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

import { PaymentsMethodProvider } from '@/enums/payments-method-provider.enum';
import { PaymentsMethodType } from '@/enums/payments-method-type.enum';
import {
  IPaymentsMethodModelData,
  PaymentsMethodModel
} from '@/models/payments-method.model';

export class PaymentsMethodModelMock extends PaymentsMethodModel {
  constructor(data?: Partial<IPaymentsMethodModelData>) {
    super({
      _id: nanoid(),
      parent: data?.parent ?? 'anyParent',
      type: data?.type ?? PaymentsMethodType.CREDIT_CARD,
      provider: data?.provider ?? PaymentsMethodProvider.STRIPE,
      externalPaymentMethodId:
        data?.externalPaymentMethodId ?? 'anyExternalPaymentMethodId',
      active: data?.active ?? true,
      activatedAt: data?.activatedAt ?? null,
      deactivatedAt: data?.deactivatedAt ?? null,
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null,
      createdBy: data?.createdBy ?? 'accounts.anyAccount',
      updatedBy: data?.updatedBy ?? 'accounts.anyAccount'
    });
  }
}
