import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

import { defaultCurrencyId } from '@/constants/default-currency-id';
import { InvoiceStatus } from '@/enums/invoice-status.enum';
import { IInvoiceModelData, InvoiceModel } from '@/models/invoice.model';

export class InvoiceModelMock extends InvoiceModel {
  constructor(data?: Partial<IInvoiceModelData>) {
    super({
      _id: nanoid(),
      app: data?.app ?? 'apps.any',
      customer: data?.customer ?? 'accounts.any',
      subscription: data?.subscription ?? 'subscriptions.any',
      paymentMethod: data?.paymentMethod ?? 'paymentMethods.any',
      currency: data?.currency ?? defaultCurrencyId,
      status: data?.status ?? InvoiceStatus.PAID,
      totalAmount: data?.totalAmount ?? 1000,
      subtotalAmount: data?.subtotalAmount ?? 1000,
      active: data?.active ?? true,
      url: data?.url ?? null,
      stripeInvoice: data?.stripeInvoice ?? null,
      paidAt: data?.paidAt ?? convertToISODateString(Date.now()),
      canceledAt: data?.canceledAt ?? null,
      paymentErrorAt: data?.paymentErrorAt ?? null,
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null,
      createdBy: data?.createdBy ?? 'accounts.anyAccount',
      updatedBy: data?.updatedBy ?? 'accounts.anyAccount'
    });
  }
}
