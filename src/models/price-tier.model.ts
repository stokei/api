import { AggregateRoot } from '@nestjs/cqrs';
import { convertToISODateString, createServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { PriceTierCreatedEvent } from '@/events/implements/price-tiers/price-tier-created.event';
import { PriceTierRemovedEvent } from '@/events/implements/price-tiers/price-tier-removed.event';
import { PriceTierUpdatedEvent } from '@/events/implements/price-tiers/price-tier-updated.event';

export interface IPriceTierModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly app: string;
  readonly parent: string;
  readonly amount: number;
  readonly upTo?: number;
  readonly infinite: boolean;
  readonly updatedAt?: Date | string;
  readonly createdAt?: Date | string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
}

export class PriceTierModel extends AggregateRoot {
  readonly id: string;
  readonly app: string;
  readonly parent: string;
  readonly amount: number;
  readonly upTo?: number;
  readonly stripeUpTo?: 'inf' | number;
  readonly infinite: boolean;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
  constructor(data: IPriceTierModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.PRICE_TIERS,
      id: data._id?.toString() || data.id
    });
    this.app = data.app;
    this.parent = data.parent;
    this.amount = data.amount;
    this.upTo = data.upTo;
    this.infinite = data.infinite;
    this.stripeUpTo = data.infinite ? 'inf' : data.upTo;
    this.updatedAt = convertToISODateString(data.updatedAt);
    this.createdAt = convertToISODateString(data.createdAt);
    this.updatedBy = data.updatedBy;
    this.createdBy = data.createdBy;
  }

  createdPriceTier({ createdBy }: { createdBy: string }) {
    if (this.id) {
      this.apply(
        new PriceTierCreatedEvent({
          createdBy,
          priceTier: this
        })
      );
    }
  }

  updatedPriceTier({ updatedBy }: { updatedBy: string }) {
    if (this.id) {
      this.apply(
        new PriceTierUpdatedEvent({
          updatedBy,
          priceTier: this
        })
      );
    }
  }

  removedPriceTier({ removedBy }: { removedBy: string }) {
    if (this.id) {
      this.apply(
        new PriceTierRemovedEvent({
          removedBy,
          priceTier: this
        })
      );
    }
  }
}
