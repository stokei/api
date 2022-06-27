import { AggregateRoot } from '@nestjs/cqrs';
import { convertToISODateString, createServiceId } from '@stokei/nestjs';

import { SubscriptionStatus } from '@/enums/subscription-status.enum';
import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { SubscriptionCreatedEvent } from '@/events/implements/subscriptions/subscription-created.event';
import { SubscriptionRemovedEvent } from '@/events/implements/subscriptions/subscription-removed.event';
import { SubscriptionUpdatedEvent } from '@/events/implements/subscriptions/subscription-updated.event';

export interface ISubscriptionModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly parent: string;
  readonly product: string;
  readonly status: SubscriptionStatus;
  readonly active: boolean;
  readonly startAt?: Date | string;
  readonly endAt?: Date | string;
  readonly canceledAt?: Date | string;
  readonly updatedAt?: Date | string;
  readonly createdAt?: Date | string;
}

export class SubscriptionModel extends AggregateRoot {
  readonly id: string;
  readonly parent: string;
  readonly product: string;
  readonly status: SubscriptionStatus;
  readonly active: boolean;
  readonly startAt?: string;
  readonly endAt?: string;
  readonly canceledAt?: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  constructor(data: ISubscriptionModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.SUBSCRIPTIONS,
      module: ServerStokeiApiIdPrefix.SUBSCRIPTIONS,
      id: data._id?.toString() || data.id
    });
    this.parent = data.parent;
    this.product = data.product;
    this.status = data.status;
    this.active = data.active;
    this.startAt = convertToISODateString(data.startAt);
    this.endAt = convertToISODateString(data.endAt);
    this.canceledAt = convertToISODateString(data.canceledAt);
    this.updatedAt = convertToISODateString(data.updatedAt);
    this.createdAt = convertToISODateString(data.createdAt);
  }

  createdSubscription() {
    if (this.id) {
      this.apply(
        new SubscriptionCreatedEvent({
          subscription: this
        })
      );
    }
  }

  updatedSubscription() {
    if (this.id) {
      this.apply(
        new SubscriptionUpdatedEvent({
          subscription: this
        })
      );
    }
  }

  removedSubscription() {
    if (this.id) {
      this.apply(
        new SubscriptionRemovedEvent({
          subscription: this
        })
      );
    }
  }
}
