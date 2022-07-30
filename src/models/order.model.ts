import { AggregateRoot } from '@nestjs/cqrs';
import { convertToISODateString, createServiceId } from '@stokei/nestjs';

import { OrderStatus } from '@/enums/order-status.enum';
import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { OrderCreatedEvent } from '@/events/implements/orders/order-created.event';

export interface IOrderModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly app: string;
  readonly cart: string;
  readonly customer: string;
  readonly applicationFeePercentage: number;
  readonly applicationFeeAmount: number;
  readonly currency: string;
  readonly amount: number;
  readonly discountAmount: number;
  readonly subtotalAmount: number;
  readonly totalAmount: number;
  readonly status: OrderStatus;
  readonly oldStatus?: OrderStatus;
  readonly active: boolean;
  readonly paidAt?: Date | string;
  readonly canceledAt?: Date | string;
  readonly paymentErrorAt?: Date | string;
  readonly totalRefundedAt?: Date | string;
  readonly parcialRefundedAt?: Date | string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
}

export class OrderModel extends AggregateRoot {
  readonly id: string;
  readonly app: string;
  readonly cart: string;
  readonly customer: string;
  readonly applicationFeePercentage: number;
  readonly applicationFeeAmount: number;
  readonly currency: string;
  readonly amount: number;
  readonly discountAmount: number;
  readonly subtotalAmount: number;
  readonly totalAmount: number;
  readonly status: OrderStatus;
  readonly oldStatus?: OrderStatus;
  readonly active: boolean;
  readonly paidAt?: string;
  readonly canceledAt?: string;
  readonly paymentErrorAt?: string;
  readonly totalRefundedAt?: string;
  readonly parcialRefundedAt?: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
  constructor(data: IOrderModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.ORDERS,
      module: ServerStokeiApiIdPrefix.ORDERS,
      id: data._id?.toString() || data.id
    });
    this.app = data.app;
    this.cart = data.cart;
    this.customer = data.customer;
    this.applicationFeePercentage = data.applicationFeePercentage;
    this.applicationFeeAmount = data.applicationFeeAmount;
    this.currency = data.currency;
    this.amount = data.amount || 0;
    this.discountAmount = data.discountAmount || 0;
    this.subtotalAmount = data.subtotalAmount || 0;
    this.totalAmount = data.totalAmount || 0;
    this.status = data.status;
    this.oldStatus = data.oldStatus;
    this.active = this.status === OrderStatus.PAID || data.active;
    this.paidAt = convertToISODateString(data.paidAt);
    this.canceledAt = convertToISODateString(data.canceledAt);
    this.paymentErrorAt = convertToISODateString(data.paymentErrorAt);
    this.totalRefundedAt = convertToISODateString(data.totalRefundedAt);
    this.parcialRefundedAt = convertToISODateString(data.parcialRefundedAt);
    this.updatedAt = convertToISODateString(data.updatedAt);
    this.createdAt = convertToISODateString(data.createdAt);
    this.app = data.app;
    this.updatedBy = data.updatedBy;
    this.createdBy = data.createdBy;
  }

  createdOrder({ createdBy }: { createdBy: string }) {
    if (this.id) {
      this.apply(
        new OrderCreatedEvent({
          createdBy,
          order: this
        })
      );
    }
  }
}
