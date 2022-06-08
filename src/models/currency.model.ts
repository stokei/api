import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { CurrencyCreatedEvent } from '@/events/implements/currencies/currency-created.event';
import { CurrencyUpdatedEvent } from '@/events/implements/currencies/currency-updated.event';
import { CurrencyRemovedEvent } from '@/events/implements/currencies/currency-removed.event';
import { AggregateRoot } from '@nestjs/cqrs';
import { createServiceId } from '@stokei/nestjs';

export interface ICurrencyModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
}

export class CurrencyModel extends AggregateRoot {
  readonly id: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  constructor(data: ICurrencyModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.CURRENCIES,
      module: ServerStokeiApiIdPrefix.CURRENCIES,
      id: data._id?.toString() || data.id
    });
    this.parent = data.parent;
    this.name = data.name;
    this.updatedAt = data.updatedAt;
    this.createdAt = data.createdAt;
  }

  createdCurrency() {
    if (this.id) {
      this.apply(
        new CurrencyCreatedEvent({
          currency: this
        })
      );
    }
  }

  updatedCurrency() {
    if (this.id) {
      this.apply(
        new CurrencyUpdatedEvent({
          currency: this
        })
      );
    }
  }

  removedCurrency() {
    if (this.id) {
      this.apply(
        new CurrencyRemovedEvent({
          currency: this
        })
      );
    }
  }
}
