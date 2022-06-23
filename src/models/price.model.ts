import { AggregateRoot } from '@nestjs/cqrs';
import { convertToISODateString, createServiceId } from '@stokei/nestjs';

import { PriceType } from '@/enums/price-type.enum';
import { RecurringType } from '@/enums/recurring-type.enum';
import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { PriceCreatedEvent } from '@/events/implements/prices/price-created.event';
import { PriceRemovedEvent } from '@/events/implements/prices/price-removed.event';
import { PriceUpdatedEvent } from '@/events/implements/prices/price-updated.event';

export interface IPriceModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly parent: string;
  readonly default: boolean;
  readonly amount: number;
  readonly fromAmount?: number;
  readonly toAmount: number;
  readonly paymentMethod: string;
  readonly installments: number;
  readonly type: PriceType;
  readonly recurringIntervalCount: number;
  readonly recurringIntervalType: RecurringType;
  readonly quantity: number;
  readonly active: boolean;
  readonly updatedAt?: Date | string;
  readonly createdAt?: Date | string;
}

export class PriceModel extends AggregateRoot {
  readonly id: string;
  readonly parent: string;
  readonly default: boolean;
  readonly amount: number;
  readonly fromAmount?: number;
  readonly toAmount: number;
  readonly paymentMethod: string;
  readonly installments: number;
  readonly type: PriceType;
  readonly recurringIntervalCount: number;
  readonly recurringIntervalType: RecurringType;
  readonly quantity: number;
  readonly active: boolean;
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
    this.default = data.default;
    this.amount = data.amount;
    this.fromAmount = data.fromAmount;
    this.toAmount = data.toAmount;
    this.paymentMethod = data.paymentMethod;
    this.installments = data.installments;
    this.type = data.type;
    this.recurringIntervalCount = data.recurringIntervalCount;
    this.recurringIntervalType = data.recurringIntervalType;
    this.quantity = data.quantity;
    this.active = data.active;
    this.updatedAt = convertToISODateString(data.updatedAt);
    this.createdAt = convertToISODateString(data.createdAt);
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
