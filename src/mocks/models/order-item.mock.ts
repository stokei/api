import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

import { defaultCurrencyId } from '@/constants/default-currency-id';
import { PriceType } from '@/enums/price-type.enum';
import { RecurringType } from '@/enums/recurring-type.enum';
import { IOrderItemModelData, OrderItemModel } from '@/models/order-item.model';

export class OrderItemModelMock extends OrderItemModel {
  constructor(data?: Partial<IOrderItemModelData>) {
    super({
      _id: nanoid(),
      order: data?.order ?? 'orders.anyOrder',
      product: data?.product ?? 'products.anyProduct',
      name: data?.name ?? 'OrderItem Name',
      currency: data?.currency ?? defaultCurrencyId,
      description: data?.description ?? null,
      amount: data?.amount ?? 10000,
      fromAmount: data?.fromAmount ?? 10100,
      avatar: data?.avatar ?? null,
      quantity: data?.quantity ?? 1,
      type: data?.type ?? PriceType.RECURRING,
      recurringIntervalCount: data?.recurringIntervalCount ?? 1,
      recurringIntervalType: data?.recurringIntervalType ?? RecurringType.MONTH,
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null,
      app: data?.app ?? 'apps.anyApp',
      createdBy: data?.createdBy ?? 'accounts.anyAccount',
      updatedBy: data?.updatedBy ?? 'accounts.anyAccount'
    });
  }
}
