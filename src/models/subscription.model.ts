import { AggregateRoot } from '@nestjs/cqrs';
import { convertToISODateString, createServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { SubscriptionStatus } from '@/enums/subscription-status.enum';
import { SubscriptionCreatedEvent } from '@/events/implements/subscriptions/subscription-created.event';
import { SubscriptionUpdatedEvent } from '@/events/implements/subscriptions/subscription-updated.event';

export interface ISubscriptionModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly parent: string;
  readonly product: string;
  readonly status: SubscriptionStatus;
  readonly active: boolean;
  readonly automaticRenew: boolean;
  readonly startAt?: Date | string;
  readonly endAt?: Date | string;
  readonly canceledAt?: Date | string;
  readonly updatedAt?: Date | string;
  readonly createdAt?: Date | string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
}

export class SubscriptionModel extends AggregateRoot {
  readonly id: string;
  readonly parent: string;
  readonly product: string;
  readonly status: SubscriptionStatus;
  readonly active: boolean;
  readonly automaticRenew: boolean;
  readonly startAt?: string;
  readonly endAt?: string;
  readonly canceledAt?: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
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
    this.automaticRenew = data.automaticRenew;
    this.startAt = convertToISODateString(data.startAt);
    this.endAt = convertToISODateString(data.endAt);
    this.canceledAt = convertToISODateString(data.canceledAt);
    this.updatedAt = convertToISODateString(data.updatedAt);
    this.createdAt = convertToISODateString(data.createdAt);
    this.updatedBy = data.updatedBy;
    this.createdBy = data.createdBy;
  }

  createdSubscription({ createdBy }: { createdBy: string }) {
    if (this.id) {
      this.apply(
        new SubscriptionCreatedEvent({
          createdBy,
          subscription: this
        })
      );
    }
  }

  updatedSubscription({ updatedBy }: { updatedBy: string }) {
    if (this.id) {
      this.apply(
        new SubscriptionUpdatedEvent({
          updatedBy,
          subscription: this
        })
      );
    }
  }
}
