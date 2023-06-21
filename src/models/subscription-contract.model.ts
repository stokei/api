import { AggregateRoot } from '@nestjs/cqrs';
import {
  addDays,
  addMonths,
  addWeeks,
  addYears,
  convertToISODate,
  convertToISODateString,
  createServiceId
} from '@stokei/nestjs';

import { IntervalType } from '@/enums/interval-type.enum';
import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { SubscriptionContractStatus } from '@/enums/subscription-contract-status.enum';
import { SubscriptionContractType } from '@/enums/subscription-contract-type.enum';
import { SubscriptionContractActivatedEvent } from '@/events/implements/subscription-contracts/subscription-contract-activated.event';
import { SubscriptionContractCanceledEvent } from '@/events/implements/subscription-contracts/subscription-contract-canceled.event';
import { SubscriptionContractCreatedEvent } from '@/events/implements/subscription-contracts/subscription-contract-created.event';
import { SubscriptionContractCreatedByAdminEvent } from '@/events/implements/subscription-contracts/subscription-contract-created-by-admin.event';
import { SubscriptionContractUpdatedEvent } from '@/events/implements/subscription-contracts/subscription-contract-updated.event';

import { RecurringModel } from './recurring.model';

export interface ISubscriptionContractModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly app: string;
  readonly parent: string;
  readonly paymentMethod: string;
  readonly stripeSubscription?: string;
  readonly stripeCheckoutSession?: string;
  readonly status: SubscriptionContractStatus;
  readonly type: SubscriptionContractType;
  readonly automaticRenew: boolean;
  readonly active: boolean;
  readonly startAt?: Date | string;
  readonly endAt?: Date | string;
  readonly updatedAt?: Date | string;
  readonly createdAt?: Date | string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
  readonly createdByAdmin: boolean;
}

export class SubscriptionContractModel extends AggregateRoot {
  readonly id: string;
  readonly app: string;
  readonly parent: string;
  readonly paymentMethod: string;
  readonly stripeSubscription?: string;
  readonly stripeCheckoutSession?: string;
  readonly status: SubscriptionContractStatus;
  readonly type: SubscriptionContractType;
  readonly automaticRenew: boolean;
  readonly active: boolean;
  readonly startAt?: string;
  readonly endAt?: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
  readonly createdByAdmin: boolean;

  constructor(data: ISubscriptionContractModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.SUBSCRIPTION_CONTRACTS,
      id: data._id?.toString() || data.id
    });
    this.app = data.app;
    this.parent = data.parent;
    this.paymentMethod = data.paymentMethod;
    this.stripeSubscription = data.stripeSubscription;
    this.stripeCheckoutSession = data.stripeCheckoutSession;
    this.status = data.status;
    this.type = data.type;
    this.automaticRenew = data.automaticRenew;
    this.active = data.active;
    this.startAt = convertToISODateString(data.startAt);
    this.endAt = convertToISODateString(data.endAt);
    this.updatedAt = convertToISODateString(data.updatedAt);
    this.createdAt = convertToISODateString(data.createdAt);
    this.updatedBy = data.updatedBy;
    this.createdBy = data.createdBy;
    this.createdByAdmin = data.createdByAdmin;
  }

  get isRecurring() {
    return SubscriptionContractType.RECURRING === this.type;
  }

  get isCanceled() {
    return SubscriptionContractStatus.CANCELED === this.status;
  }

  static generateEndDate(startDate: string, recurring: RecurringModel) {
    const startAt = convertToISODate(startDate);
    const getDateHandler = {
      [IntervalType.DAY]: addDays,
      [IntervalType.WEEK]: addWeeks,
      [IntervalType.MONTH]: addMonths,
      [IntervalType.YEAR]: addYears
    };
    return getDateHandler[recurring.interval]?.(
      recurring.intervalCount,
      startAt
    );
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

  createdSubscriptionContractByAdmin({ createdBy }: { createdBy: string }) {
    if (this.id) {
      this.apply(
        new SubscriptionContractCreatedByAdminEvent({
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
        new SubscriptionContractActivatedEvent({
          updatedBy: this.updatedBy,
          subscriptionContract: this
        })
      );
    }
  }

  canceledSubscriptionContract() {
    if (this.id) {
      this.apply(
        new SubscriptionContractCanceledEvent({
          updatedBy: this.updatedBy,
          subscriptionContract: this
        })
      );
    }
  }
}
