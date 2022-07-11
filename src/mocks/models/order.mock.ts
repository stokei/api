import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

import { OrderStatus } from '@/enums/order-status.enum';
import { IOrderModelData, OrderModel } from '@/models/order.model';

export class OrderModelMock extends OrderModel {
  constructor(data?: Partial<IOrderModelData>) {
    super({
      _id: nanoid(),
      project: data?.project ?? 'stokei',
      cart: data?.cart ?? 'carts.anyCart',
      customer: data?.customer ?? 'accounts.anyAccount',
      salesComissionPercentage: data?.salesComissionPercentage ?? 1000,
      salesComissionAmount: data?.salesComissionAmount ?? 1000,
      currency: data?.currency ?? 'BRL',
      amount: data?.amount ?? 10000,
      discountAmount: data?.discountAmount ?? 2000,
      subtotalAmount: data?.subtotalAmount ?? 12000,
      totalAmount: data?.totalAmount ?? 10000,
      status: data?.status ?? OrderStatus.PAID,
      oldStatus: data?.oldStatus ?? OrderStatus.PENDING,
      active: data?.active ?? true,
      paidAt: data?.paidAt ?? convertToISODateString(Date.now()),
      canceledAt: data?.canceledAt ?? null,
      paymentErrorAt: data?.paymentErrorAt ?? null,
      totalRefundedAt: data?.totalRefundedAt ?? null,
      parcialRefundedAt: data?.parcialRefundedAt ?? null,
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? convertToISODateString(Date.now()),
      createdBy: data?.createdBy ?? 'accounts.anyAccount',
      updatedBy: data?.updatedBy ?? 'accounts.anyAccount'
    });
  }
}
