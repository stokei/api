import { AggregateRoot } from '@nestjs/cqrs';
import { convertToISODateString, createServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { OrderCreatedEvent } from '@/events/implements/orders/order-created.event';
import { OrderRemovedEvent } from '@/events/implements/orders/order-removed.event';
import { OrderUpdatedEvent } from '@/events/implements/orders/order-updated.event';

export interface IOrderModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly parent: string;
  readonly name: string;
  readonly description?: string;
  readonly updatedAt?: Date | string;
  readonly createdAt?: Date | string;
  readonly app: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
}

export class OrderModel extends AggregateRoot {
  readonly id: string;
  readonly parent: string;
  readonly name: string;
  readonly description?: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  readonly app: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
  constructor(data: IOrderModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.MODULES,
      id: data._id?.toString() || data.id
    });
    this.parent = data.parent;
    this.name = data.name;
    this.description = data.description;
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

  updatedOrder({ updatedBy }: { updatedBy: string }) {
    if (this.id) {
      this.apply(
        new OrderUpdatedEvent({
          updatedBy,
          order: this
        })
      );
    }
  }

  removedOrder({ removedBy }: { removedBy: string }) {
    if (this.id) {
      this.apply(
        new OrderRemovedEvent({
          removedBy,
          order: this
        })
      );
    }
  }
}
