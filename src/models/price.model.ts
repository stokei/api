import { AggregateRoot } from '@nestjs/cqrs';
import { convertToISODateString, createServiceId } from '@stokei/nestjs';

import { InventoryType } from '@/enums/inventory-type.enum';
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
  readonly fromAmount?: number;
  readonly amount: number;
  readonly type: PriceType;
  readonly inventoryType: InventoryType;
  readonly recurringIntervalCount: number;
  readonly recurringIntervalType: RecurringType;
  readonly quantity: number;
  readonly active: boolean;
  readonly updatedAt?: Date | string;
  readonly createdAt?: Date | string;
  readonly app: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
}

export class PriceModel extends AggregateRoot {
  readonly id: string;
  readonly parent: string;
  readonly default: boolean;
  readonly fromAmount?: number;
  readonly amount: number;
  readonly type: PriceType;
  readonly inventoryType: InventoryType;
  readonly recurringIntervalCount: number;
  readonly recurringIntervalType: RecurringType;
  readonly quantity: number;
  readonly active: boolean;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  readonly app: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
  constructor(data: IPriceModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.PRICES,
      module: ServerStokeiApiIdPrefix.PRICES,
      id: data._id?.toString() || data.id
    });
    this.parent = data.parent;
    this.default = data.default;
    this.fromAmount = data.fromAmount || 0;
    this.amount = data.amount;
    this.type = data.type;
    this.inventoryType = data.inventoryType;
    this.recurringIntervalCount = data.recurringIntervalCount;
    this.recurringIntervalType = data.recurringIntervalType;
    this.quantity =
      this.inventoryType === InventoryType.INFINITE ? null : data.quantity;
    this.active = data.active;
    this.updatedAt = convertToISODateString(data.updatedAt);
    this.createdAt = convertToISODateString(data.createdAt);
    this.app = data.app;
    this.updatedBy = data.updatedBy;
    this.createdBy = data.createdBy;
  }

  createdPrice({ createdBy }: { createdBy: string }) {
    if (this.id) {
      this.apply(
        new PriceCreatedEvent({
          createdBy,
          price: this
        })
      );
    }
  }

  updatedPrice({ updatedBy }: { updatedBy: string }) {
    if (this.id) {
      this.apply(
        new PriceUpdatedEvent({
          updatedBy,
          price: this
        })
      );
    }
  }

  removedPrice({ removedBy }: { removedBy: string }) {
    if (this.id) {
      this.apply(
        new PriceRemovedEvent({
          removedBy,
          price: this
        })
      );
    }
  }
}
