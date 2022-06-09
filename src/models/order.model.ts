import { AggregateRoot } from '@nestjs/cqrs';
import { createServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { OrderCreatedEvent } from '@/events/implements/orders/order-created.event';
import { OrderRemovedEvent } from '@/events/implements/orders/order-removed.event';
import { OrderUpdatedEvent } from '@/events/implements/orders/order-updated.event';

export interface IOrderModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
}

export class OrderModel extends AggregateRoot {
  readonly id: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  constructor(data: IOrderModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.ORDERS,
      module: ServerStokeiApiIdPrefix.ORDERS,
      id: data._id?.toString() || data.id
    });
    this.parent = data.parent;
    this.name = data.name;
    this.updatedAt = data.updatedAt;
    this.createdAt = data.createdAt;
  }

  createdOrder() {
    if (this.id) {
      this.apply(
        new OrderCreatedEvent({
          order: this
        })
      );
    }
  }

  updatedOrder() {
    if (this.id) {
      this.apply(
        new OrderUpdatedEvent({
          order: this
        })
      );
    }
  }

  removedOrder() {
    if (this.id) {
      this.apply(
        new OrderRemovedEvent({
          order: this
        })
      );
    }
  }
}
