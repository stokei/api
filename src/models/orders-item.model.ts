import { AggregateRoot } from '@nestjs/cqrs';
import { convertToISODateString, createServiceId } from '@stokei/nestjs';

import { PriceType } from '@/enums/price-type.enum';
import { RecurringType } from '@/enums/recurring-type.enum';
import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { OrdersItemCreatedEvent } from '@/events/implements/orders-items/orders-item-created.event';
import { OrdersItemRemovedEvent } from '@/events/implements/orders-items/orders-item-removed.event';
import { OrdersItemUpdatedEvent } from '@/events/implements/orders-items/orders-item-updated.event';

export interface IOrdersItemModelData {
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
  readonly recurringIntervalCount: string;
  readonly recurringIntervalType: RecurringType;
  readonly updatedAt?: Date | string;
  readonly createdAt?: Date | string;
}

export class OrdersItemModel extends AggregateRoot {
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
  readonly recurringIntervalCount: string;
  readonly recurringIntervalType: RecurringType;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  constructor(data: IOrdersItemModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.ORDERS_ITEMS,
      module: ServerStokeiApiIdPrefix.ORDERS_ITEMS,
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
  }

  createdOrdersItem() {
    if (this.id) {
      this.apply(
        new OrdersItemCreatedEvent({
          ordersItem: this
        })
      );
    }
  }

  updatedOrdersItem() {
    if (this.id) {
      this.apply(
        new OrdersItemUpdatedEvent({
          ordersItem: this
        })
      );
    }
  }

  removedOrdersItem() {
    if (this.id) {
      this.apply(
        new OrdersItemRemovedEvent({
          ordersItem: this
        })
      );
    }
  }
}
