import { AggregateRoot } from '@nestjs/cqrs';
import { convertToISODateString, createServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { CartCreatedEvent } from '@/events/implements/carts/cart-created.event';
import { CartRemovedEvent } from '@/events/implements/carts/cart-removed.event';
import { CartUpdatedEvent } from '@/events/implements/carts/cart-updated.event';

export interface ICartModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly updatedAt?: Date | string;
  readonly createdAt?: Date | string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
}

export class CartModel extends AggregateRoot {
  readonly id: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
  constructor(data: ICartModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.CARTS,
      module: ServerStokeiApiIdPrefix.CARTS,
      id: data._id?.toString() || data.id
    });
    this.updatedAt = convertToISODateString(data.updatedAt);
    this.createdAt = convertToISODateString(data.createdAt);
    this.updatedBy = data.updatedBy;
    this.createdBy = data.createdBy;
  }

  createdCart() {
    if (this.id) {
      this.apply(
        new CartCreatedEvent({
          cart: this
        })
      );
    }
  }

  updatedCart() {
    if (this.id) {
      this.apply(
        new CartUpdatedEvent({
          cart: this
        })
      );
    }
  }

  removedCart() {
    if (this.id) {
      this.apply(
        new CartRemovedEvent({
          cart: this
        })
      );
    }
  }
}
