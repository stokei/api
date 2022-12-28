import { AggregateRoot } from '@nestjs/cqrs';
import { convertToISODateString, createServiceId } from '@stokei/nestjs';

import { BillingScheme } from '@/enums/billing-scheme.enum';
import { InventoryType } from '@/enums/inventory-type.enum';
import { PriceType } from '@/enums/price-type.enum';
import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { TiersMode } from '@/enums/tiers-mode.enum';
import { PriceCreatedEvent } from '@/events/implements/prices/price-created.event';
import { PriceRemovedEvent } from '@/events/implements/prices/price-removed.event';
import { PriceUpdatedEvent } from '@/events/implements/prices/price-updated.event';

export interface IPriceModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly app: string;
  readonly parent: string;
  readonly nickname?: string;
  readonly currency: string;
  readonly stripePrice?: string;
  readonly fromAmount?: number;
  readonly amount: number;
  readonly type: PriceType;
  readonly billingScheme: BillingScheme;
  readonly tiersMode: TiersMode;
  readonly inventoryType: InventoryType;
  readonly recurring?: string;
  readonly quantity: number;
  readonly active: boolean;
  readonly updatedAt?: Date | string;
  readonly createdAt?: Date | string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
}

export class PriceModel extends AggregateRoot {
  readonly id: string;
  readonly app: string;
  readonly parent: string;
  readonly nickname?: string;
  readonly currency: string;
  readonly stripePrice?: string;
  readonly fromAmount?: number;
  readonly amount: number;
  readonly isUsageBilling: boolean;
  readonly type: PriceType;
  readonly billingScheme: BillingScheme;
  readonly tiersMode: TiersMode;
  readonly inventoryType: InventoryType;
  readonly recurring?: string;
  readonly quantity: number;
  readonly active: boolean;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
  constructor(data: IPriceModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.PRICES,
      id: data._id?.toString() || data.id
    });
    this.parent = data.parent;
    this.nickname = data.nickname;
    this.app = data.app;
    this.parent = data.parent;
    this.currency = data.currency;
    this.stripePrice = data.stripePrice;
    this.fromAmount = data.fromAmount;
    this.amount = data.amount;
    this.type = data.type;
    this.billingScheme = data.billingScheme;
    this.tiersMode = data.tiersMode;
    this.isUsageBilling = data.billingScheme === BillingScheme.TIERED;
    this.inventoryType = data.inventoryType;
    this.recurring = data.recurring;
    this.quantity =
      this.inventoryType === InventoryType.INFINITE ? null : data.quantity;
    this.active = data.active;
    this.updatedAt = convertToISODateString(data.updatedAt);
    this.createdAt = convertToISODateString(data.createdAt);
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
