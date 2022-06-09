import { AggregateRoot } from '@nestjs/cqrs';
import { createServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { CheckoutsCurrencyCreatedEvent } from '@/events/implements/checkouts-currencies/checkouts-currency-created.event';
import { CheckoutsCurrencyRemovedEvent } from '@/events/implements/checkouts-currencies/checkouts-currency-removed.event';
import { CheckoutsCurrencyUpdatedEvent } from '@/events/implements/checkouts-currencies/checkouts-currency-updated.event';

export interface ICheckoutsCurrencyModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
}

export class CheckoutsCurrencyModel extends AggregateRoot {
  readonly id: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  constructor(data: ICheckoutsCurrencyModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.CHECKOUTS_CURRENCIES,
      module: ServerStokeiApiIdPrefix.CHECKOUTS_CURRENCIES,
      id: data._id?.toString() || data.id
    });
    this.parent = data.parent;
    this.name = data.name;
    this.updatedAt = data.updatedAt;
    this.createdAt = data.createdAt;
  }

  createdCheckoutsCurrency() {
    if (this.id) {
      this.apply(
        new CheckoutsCurrencyCreatedEvent({
          checkoutsCurrency: this
        })
      );
    }
  }

  updatedCheckoutsCurrency() {
    if (this.id) {
      this.apply(
        new CheckoutsCurrencyUpdatedEvent({
          checkoutsCurrency: this
        })
      );
    }
  }

  removedCheckoutsCurrency() {
    if (this.id) {
      this.apply(
        new CheckoutsCurrencyRemovedEvent({
          checkoutsCurrency: this
        })
      );
    }
  }
}
