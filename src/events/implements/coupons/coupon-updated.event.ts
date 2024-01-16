import { CouponModel } from '@/models/coupon.model';

interface IDataCouponUpdatedEvent {
  readonly updatedBy: string;
  readonly coupon: CouponModel;
}

export class CouponUpdatedEvent {
  readonly updatedBy: string;
  readonly coupon: CouponModel;

  constructor(data: IDataCouponUpdatedEvent) {
    this.updatedBy = data.updatedBy;
    this.coupon = data.coupon;
  }
}
