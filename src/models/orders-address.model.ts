import { AggregateRoot } from '@nestjs/cqrs';
import { createServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { OrdersAddressCreatedEvent } from '@/events/implements/orders-addresses/orders-address-created.event';
import { OrdersAddressRemovedEvent } from '@/events/implements/orders-addresses/orders-address-removed.event';
import { OrdersAddressUpdatedEvent } from '@/events/implements/orders-addresses/orders-address-updated.event';

export interface IOrdersAddressModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
}

export class OrdersAddressModel extends AggregateRoot {
  readonly id: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  constructor(data: IOrdersAddressModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.ORDERS_ADDRESSES,
      module: ServerStokeiApiIdPrefix.ORDERS_ADDRESSES,
      id: data._id?.toString() || data.id
    });
    this.parent = data.parent;
    this.name = data.name;
    this.updatedAt = data.updatedAt;
    this.createdAt = data.createdAt;
  }

  createdOrdersAddress() {
    if (this.id) {
      this.apply(
        new OrdersAddressCreatedEvent({
          ordersAddress: this
        })
      );
    }
  }

  updatedOrdersAddress() {
    if (this.id) {
      this.apply(
        new OrdersAddressUpdatedEvent({
          ordersAddress: this
        })
      );
    }
  }

  removedOrdersAddress() {
    if (this.id) {
      this.apply(
        new OrdersAddressRemovedEvent({
          ordersAddress: this
        })
      );
    }
  }
}
