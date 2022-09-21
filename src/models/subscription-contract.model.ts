import { AggregateRoot } from '@nestjs/cqrs';
import { convertToISODateString, createServiceId } from '@stokei/nestjs';

import { RecurringType } from '@/enums/recurring-type.enum';
import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { SubscriptionContractStatus } from '@/enums/subscription-contract-status.enum';
import { SubscriptionContractType } from '@/enums/subscription-contract-type.enum';
import { SubscriptionContractCreatedEvent } from '@/events/implements/subscription-contracts/subscription-contract-created.event';
import { SubscriptionContractUpdatedEvent } from '@/events/implements/subscription-contracts/subscription-contract-updated.event';

export interface ISubscriptionContractModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly app: string;
  readonly parent: string;
  readonly product: string;
  readonly invoiceProduct: string;
  readonly invoicePrice: string;
  readonly stripeSubscription: string;
  readonly paymentMethod: string;
  readonly status: SubscriptionContractStatus;
  readonly type: SubscriptionContractType;
  readonly recurringIntervalCount: number;
  readonly recurringIntervalType: RecurringType;
  readonly automaticRenew: boolean;
  readonly active: boolean;
  readonly startAt?: Date | string;
  readonly endAt?: Date | string;
  readonly updatedAt?: Date | string;
  readonly createdAt?: Date | string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
}

export class SubscriptionContractModel extends AggregateRoot {
  readonly id: string;
  readonly app: string;
  readonly parent: string;
  readonly product: string;
  readonly invoiceProduct: string;
  readonly invoicePrice: string;
  readonly stripeSubscription: string;
  readonly paymentMethod: string;
  readonly status: SubscriptionContractStatus;
  readonly type: SubscriptionContractType;
  readonly recurringIntervalCount: number;
  readonly recurringIntervalType: RecurringType;
  readonly isRecurring: boolean;
  readonly automaticRenew: boolean;
  readonly active: boolean;
  readonly startAt?: string;
  readonly endAt?: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
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
    this.paymentMethod = data.paymentMethod;
    this.invoiceProduct = data.invoiceProduct;
    this.invoicePrice = data.invoicePrice;
    this.type = data.type;
    this.stripeSubscription = data.stripeSubscription;
    this.isRecurring = SubscriptionContractType.RECURRING === this.type;
    this.recurringIntervalCount = data.recurringIntervalCount;
    this.recurringIntervalType = data.recurringIntervalType;
    this.status = data.status;
    this.active = data.active;
    this.automaticRenew = data.automaticRenew;
    this.startAt = convertToISODateString(data.startAt);
    this.endAt = convertToISODateString(data.endAt);
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

  activatedSubscriptionContract() {
    if (this.id) {
      this.apply(
        new SubscriptionContractUpdatedEvent({
          updatedBy: this.updatedBy,
          subscriptionContract: this
        })
      );
    }
  }
}
