import { AggregateRoot } from '@nestjs/cqrs';
import { convertToISODateString } from '@stokei/nestjs';

import { CurrencyCreatedEvent } from '@/events/implements/currencies/currency-created.event';
import { CurrencyRemovedEvent } from '@/events/implements/currencies/currency-removed.event';
import { CurrencyUpdatedEvent } from '@/events/implements/currencies/currency-updated.event';

export interface ICurrencyModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly name: string;
  readonly symbol: string;
  readonly minorUnit: number;
  readonly active: boolean;
  readonly activatedAt?: Date | string;
  readonly deactivatedAt?: Date | string;
  readonly updatedAt?: Date | string;
  readonly createdAt?: Date | string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
}

export class CurrencyModel extends AggregateRoot {
  readonly id: string;
  readonly name: string;
  readonly symbol: string;
  readonly minorUnit: number;
  readonly active: boolean;
  readonly activatedAt?: string;
  readonly deactivatedAt?: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
  constructor(data: ICurrencyModelData) {
    super();

    this.id = (data._id?.toString() || data.id).toUpperCase();
    this.name = data.name;
    this.symbol = data.symbol;
    this.minorUnit = data.minorUnit;
    this.active = data.active;
    this.activatedAt = convertToISODateString(data.activatedAt);
    this.deactivatedAt = convertToISODateString(data.deactivatedAt);
    this.updatedAt = convertToISODateString(data.updatedAt);
    this.createdAt = convertToISODateString(data.createdAt);
    this.updatedBy = data.updatedBy;
    this.createdBy = data.createdBy;
  }

  createdCurrency({ createdBy }: { createdBy: string }) {
    if (this.id) {
      this.apply(
        new CurrencyCreatedEvent({
          createdBy,
          currency: this
        })
      );
    }
  }

  updatedCurrency({ updatedBy }: { updatedBy: string }) {
    if (this.id) {
      this.apply(
        new CurrencyUpdatedEvent({
          updatedBy,
          currency: this
        })
      );
    }
  }

  removedCurrency({ removedBy }: { removedBy: string }) {
    if (this.id) {
      this.apply(
        new CurrencyRemovedEvent({
          removedBy,
          currency: this
        })
      );
    }
  }
}
