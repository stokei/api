import { AggregateRoot } from '@nestjs/cqrs';
import { convertToISODateString, createServiceId } from '@stokei/nestjs';

import { PriceType } from '@/enums/price-type.enum';
import { RecurringType } from '@/enums/recurring-type.enum';
import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { OrderItemCreatedEvent } from '@/events/implements/order-items/order-item-created.event';
import { OrderItemRemovedEvent } from '@/events/implements/order-items/order-item-removed.event';
import { OrderItemUpdatedEvent } from '@/events/implements/order-items/order-item-updated.event';

export interface IOrderItemModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly order: string;
  readonly product: string;
  readonly name: string;
  readonly description?: string;
  readonly amount: number;
  readonly fromAmount?: number;
  readonly toAmount: number;
  readonly avatar?: string;
  readonly quantity: number;
  readonly type: PriceType;
  readonly recurringIntervalCount: number;
  readonly recurringIntervalType: RecurringType;
  readonly updatedAt?: Date | string;
  readonly createdAt?: Date | string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
}

export class OrderItemModel extends AggregateRoot {
  readonly id: string;
  readonly order: string;
  readonly product: string;
  readonly name: string;
  readonly description?: string;
  readonly amount: number;
  readonly fromAmount?: number;
  readonly toAmount: number;
  readonly avatar?: string;
  readonly quantity: number;
  readonly type: PriceType;
  readonly recurringIntervalCount: number;
  readonly recurringIntervalType: RecurringType;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
  constructor(data: IOrderItemModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.ORDER_ITEMS,
      module: ServerStokeiApiIdPrefix.ORDER_ITEMS,
      id: data._id?.toString() || data.id
    });
    this.order = data.order;
    this.product = data.product;
    this.name = data.name;
    this.description = data.description;
    this.amount = data.amount;
    this.fromAmount = data.fromAmount;
    this.toAmount = data.toAmount;
    this.avatar = data.avatar;
    this.quantity = data.quantity;
    this.type = data.type;
    this.recurringIntervalCount = data.recurringIntervalCount;
    this.recurringIntervalType = data.recurringIntervalType;
    this.updatedAt = convertToISODateString(data.updatedAt);
    this.createdAt = convertToISODateString(data.createdAt);
    this.updatedBy = data.updatedBy;
    this.createdBy = data.createdBy;
  }

  createdOrderItem({ createdBy }: { createdBy: string }) {
    if (this.id) {
      this.apply(
        new OrderItemCreatedEvent({
          createdBy,
          orderItem: this
        })
      );
    }
  }

  updatedOrderItem({ updatedBy }: { updatedBy: string }) {
    if (this.id) {
      this.apply(
        new OrderItemUpdatedEvent({
          updatedBy,
          orderItem: this
        })
      );
    }
  }

  removedOrderItem({ removedBy }: { removedBy: string }) {
    if (this.id) {
      this.apply(
        new OrderItemRemovedEvent({
          removedBy,
          orderItem: this
        })
      );
    }
  }
}
