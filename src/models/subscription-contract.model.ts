import { AggregateRoot } from '@nestjs/cqrs';
import { convertToISODateString, createServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { SubscriptionContractStatus } from '@/enums/subscription-contract-status.enum';
import { SubscriptionContractType } from '@/enums/subscription-contract-type.enum';
import { SubscriptionContractCreatedEvent } from '@/events/implements/subscription-contracts/subscription-contract-created.event';
import { SubscriptionContractUpdatedEvent } from '@/events/implements/subscription-contracts/subscription-contract-updated.event';

export interface ISubscriptionContractModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly parent: string;
  readonly product: string;
  readonly currency: string;
  readonly stripeSubscription: string;
  readonly totalAmount: number;
  readonly subtotalAmount: number;
  readonly stripeCheckoutSession: string;
  readonly status: SubscriptionContractStatus;
  readonly type: SubscriptionContractType;
  readonly active: boolean;
  readonly automaticRenew: boolean;
  readonly defaultStripePaymentMethod?: string;
  readonly paymentErrorAt?: Date | string;
  readonly startAt?: Date | string;
  readonly endAt?: Date | string;
  readonly canceledAt?: Date | string;
  readonly updatedAt?: Date | string;
  readonly createdAt?: Date | string;
  readonly app: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
}

export class SubscriptionContractModel extends AggregateRoot {
  readonly id: string;
  readonly parent: string;
  readonly product: string;
  readonly currency: string;
  readonly stripeSubscription: string;
  readonly totalAmount: number;
  readonly subtotalAmount: number;
  readonly stripeCheckoutSession: string;
  readonly status: SubscriptionContractStatus;
  readonly type: SubscriptionContractType;
  readonly active: boolean;
  readonly automaticRenew: boolean;
  readonly defaultStripePaymentMethod?: string;
  readonly paymentErrorAt?: string;
  readonly startAt?: string;
  readonly endAt?: string;
  readonly canceledAt?: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  readonly app: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
  constructor(data: ISubscriptionContractModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.SUBSCRIPTION_CONTRACTS,
      module: ServerStokeiApiIdPrefix.SUBSCRIPTION_CONTRACTS,
      id: data._id?.toString() || data.id
    });
    this.parent = data.parent;
    this.product = data.product;
    this.currency = data.currency;
    this.stripeSubscription = data.stripeSubscription;
    this.status = data.status;
    this.type = data.type;
    this.active = data.active;
    this.automaticRenew = data.automaticRenew;
    this.defaultStripePaymentMethod = data.defaultStripePaymentMethod;
    this.totalAmount = data.totalAmount;
    this.subtotalAmount = data.subtotalAmount;
    this.stripeCheckoutSession = data.stripeCheckoutSession;
    this.paymentErrorAt = convertToISODateString(data.paymentErrorAt);
    this.startAt = convertToISODateString(data.startAt);
    this.endAt = convertToISODateString(data.endAt);
    this.canceledAt = convertToISODateString(data.canceledAt);
    this.updatedAt = convertToISODateString(data.updatedAt);
    this.createdAt = convertToISODateString(data.createdAt);
    this.app = data.app;
    this.updatedBy = data.updatedBy;
    this.createdBy = data.createdBy;
  }

  createdSubscriptionContract({ createdBy }: { createdBy: string }) {
    if (this.id) {
      this.apply(
        new SubscriptionContractCreatedEvent({
          createdBy,
          subscriptionContract: this
        })
      );
    }
  }

  updatedSubscriptionContract({ updatedBy }: { updatedBy: string }) {
    if (this.id) {
      this.apply(
        new SubscriptionContractUpdatedEvent({
          updatedBy,
          subscriptionContract: this
        })
      );
    }
  }
}
