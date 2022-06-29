import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

import { PaymentStatus } from '@/enums/payment-status.enum';
import { IPaymentModelData, PaymentModel } from '@/models/payment.model';

export class PaymentModelMock extends PaymentModel {
  constructor(data?: Partial<IPaymentModelData>) {
    super({
      _id: nanoid(),
      parent: data?.parent ?? 'anyParent',
      order: data?.order ?? 'anyParent',
      amount: data?.amount ?? 10000,
      externalPaymentId: data?.externalPaymentId ?? 'anyExternalPaymentId',
      paymentMethod: data?.paymentMethod ?? 'anyPaymentMethod',
      status: data?.status ?? PaymentStatus.PAID,
      active: data?.active ?? true,
      paidAt: data?.paidAt ?? convertToISODateString(Date.now()),
      canceledAt: data?.canceledAt ?? null,
      paymentErrorAt: data?.paymentErrorAt ?? null,
      totalRefundedAt: data?.totalRefundedAt ?? null,
      parcialRefundedAt: data?.parcialRefundedAt ?? null,
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null,
      createdBy: data?.createdBy ?? 'accounts.anyAccount',
      updatedBy: data?.updatedBy ?? 'accounts.anyAccount'
    });
  }
}
