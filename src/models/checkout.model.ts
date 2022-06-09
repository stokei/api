import { AggregateRoot } from '@nestjs/cqrs';
import { createServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { CheckoutCreatedEvent } from '@/events/implements/checkouts/checkout-created.event';
import { CheckoutRemovedEvent } from '@/events/implements/checkouts/checkout-removed.event';
import { CheckoutUpdatedEvent } from '@/events/implements/checkouts/checkout-updated.event';

export interface ICheckoutModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
}

export class CheckoutModel extends AggregateRoot {
  readonly id: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  constructor(data: ICheckoutModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.CHECKOUTS,
      module: ServerStokeiApiIdPrefix.CHECKOUTS,
      id: data._id?.toString() || data.id
    });
    this.parent = data.parent;
    this.name = data.name;
    this.updatedAt = data.updatedAt;
    this.createdAt = data.createdAt;
  }

  createdCheckout() {
    if (this.id) {
      this.apply(
        new CheckoutCreatedEvent({
          checkout: this
        })
      );
    }
  }

  updatedCheckout() {
    if (this.id) {
      this.apply(
        new CheckoutUpdatedEvent({
          checkout: this
        })
      );
    }
  }

  removedCheckout() {
    if (this.id) {
      this.apply(
        new CheckoutRemovedEvent({
          checkout: this
        })
      );
    }
  }
}
