import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

import { PriceType } from '@/enums/price-type.enum';
import { RecurringType } from '@/enums/recurring-type.enum';
import {
  IOrdersItemModelData,
  OrdersItemModel
} from '@/models/orders-item.model';

export class OrdersItemModelMock extends OrdersItemModel {
  constructor(data?: Partial<IOrdersItemModelData>) {
    super({
      _id: nanoid(),
      order: data?.order ?? 'orders.anyOrder',
      product: data?.product ?? 'products.anyProduct',
      name: data?.name ?? 'OrdersItem Name',
      description: data?.description ?? null,
      amount: data?.amount ?? 10000,
      fromAmount: data?.fromAmount ?? 10100,
      toAmount: data?.toAmount ?? 10000,
      avatar: data?.avatar ?? null,
      quantity: data?.quantity ?? 1,
      type: data?.type ?? PriceType.RECURRING,
      recurringIntervalCount: data?.recurringIntervalCount ?? 1,
      recurringIntervalType: data?.recurringIntervalType ?? RecurringType.MONTH,
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null,
      createdBy: data?.createdBy ?? 'accounts.anyAccount',
      updatedBy: data?.updatedBy ?? 'accounts.anyAccount'
    });
  }
}
