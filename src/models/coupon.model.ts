import { AggregateRoot } from '@nestjs/cqrs';
import { convertToISODateString, createServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { CouponCreatedEvent } from '@/events/implements/coupons/coupon-created.event';
import { CouponUpdatedEvent } from '@/events/implements/coupons/coupon-updated.event';

export interface ICouponModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly code: string;
  readonly parent: string;
  readonly recipient?: string;
  readonly amountOff?: number;
  readonly percentOff?: number;
  readonly active: boolean;
  readonly updatedAt?: Date | string;
  readonly createdAt?: Date | string;
  readonly app: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
}

export class CouponModel extends AggregateRoot {
  readonly id: string;
  readonly code: string;
  readonly parent: string;
  readonly recipient?: string;
  readonly amountOff?: number;
  readonly percentOff?: number;
  readonly active: boolean;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  readonly app: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
  constructor(data: ICouponModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.COURSES,
      id: data._id?.toString() || data.id
    });
    this.code = data.code;
    this.parent = data.parent;
    this.recipient = data.recipient;
    this.amountOff = data.amountOff;
    this.percentOff = data.percentOff;
    this.active = !!data.active;
    this.updatedAt = convertToISODateString(data.updatedAt);
    this.createdAt = convertToISODateString(data.createdAt);
    this.app = data.app;
    this.updatedBy = data.updatedBy;
    this.createdBy = data.createdBy;
  }

  createdCoupon({ createdBy }: { createdBy: string }) {
    if (this.id) {
      this.apply(
        new CouponCreatedEvent({
          createdBy,
          coupon: this
        })
      );
    }
  }

  updatedCoupon({ updatedBy }: { updatedBy: string }) {
    if (this.id) {
      this.apply(
        new CouponUpdatedEvent({
          updatedBy,
          coupon: this
        })
      );
    }
  }
}
