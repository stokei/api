import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { PriceCreatedEvent } from '@/events/implements/prices/price-created.event';
import { PriceUpdatedEvent } from '@/events/implements/prices/price-updated.event';
import { PriceRemovedEvent } from '@/events/implements/prices/price-removed.event';
import { AggregateRoot } from '@nestjs/cqrs';
import { createServiceId } from '@stokei/nestjs';

export interface IPriceModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
}

export class PriceModel extends AggregateRoot {
  readonly id: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  constructor(data: IPriceModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.PRICES,
      module: ServerStokeiApiIdPrefix.PRICES,
      id: data._id?.toString() || data.id
    });
    this.parent = data.parent;
    this.name = data.name;
    this.updatedAt = data.updatedAt;
    this.createdAt = data.createdAt;
  }

  createdPrice() {
    if (this.id) {
      this.apply(
        new PriceCreatedEvent({
          price: this
        })
      );
    }
  }

  updatedPrice() {
    if (this.id) {
      this.apply(
        new PriceUpdatedEvent({
          price: this
        })
      );
    }
  }

  removedPrice() {
    if (this.id) {
      this.apply(
        new PriceRemovedEvent({
          price: this
        })
      );
    }
  }
}
