import { AggregateRoot } from '@nestjs/cqrs';
import { convertToISODateString, createServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { SubscriptionContractItemCreatedEvent } from '@/events/implements/subscription-contract-items/subscription-contract-item-created.event';
import { SubscriptionContractItemRemovedEvent } from '@/events/implements/subscription-contract-items/subscription-contract-item-removed.event';
import { SubscriptionContractItemUpdatedEvent } from '@/events/implements/subscription-contract-items/subscription-contract-item-updated.event';

export interface ISubscriptionContractItemModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly app: string;
  readonly parent: string;
  readonly product: string;
  readonly quantity: number;
  readonly price: string;
  readonly stripeSubscriptionItem?: string;
  readonly recurring?: string;
  readonly updatedAt?: Date | string;
  readonly createdAt?: Date | string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
}

export class SubscriptionContractItemModel extends AggregateRoot {
  readonly id: string;
  readonly app: string;
  readonly parent: string;
  readonly product: string;
  readonly quantity: number;
  readonly price: string;
  readonly stripeSubscriptionItem?: string;
  readonly recurring?: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
  constructor(data: ISubscriptionContractItemModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.SUBSCRIPTION_CONTRACT_ITEMS,
      id: data._id?.toString() || data.id
    });
    this.app = data.app;
    this.parent = data.parent;
    this.product = data.product;
    this.quantity = data.quantity;
    this.price = data.price;
    this.stripeSubscriptionItem = data.stripeSubscriptionItem;
    this.recurring = data.recurring;
    this.updatedAt = convertToISODateString(data.updatedAt);
    this.createdAt = convertToISODateString(data.createdAt);
    this.updatedBy = data.updatedBy;
    this.createdBy = data.createdBy;
  }

  createdSubscriptionContractItem({ createdBy }: { createdBy: string }) {
    if (this.id) {
      this.apply(
        new SubscriptionContractItemCreatedEvent({
          createdBy,
          subscriptionContractItem: this
        })
      );
    }
  }

  updatedSubscriptionContractItem({ updatedBy }: { updatedBy: string }) {
    if (this.id) {
      this.apply(
        new SubscriptionContractItemUpdatedEvent({
          updatedBy,
          subscriptionContractItem: this
        })
      );
    }
  }

  removedSubscriptionContractItem({ removedBy }: { removedBy: string }) {
    if (this.id) {
      this.apply(
        new SubscriptionContractItemRemovedEvent({
          removedBy,
          subscriptionContractItem: this
        })
      );
    }
  }
}
