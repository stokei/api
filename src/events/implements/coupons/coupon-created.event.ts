import { CouponModel } from '@/models/coupon.model';

interface IDataCouponCreatedEvent {
  readonly createdBy: string;
  readonly coupon: CouponModel;
}

export class CouponCreatedEvent {
  readonly createdBy: string;
  readonly coupon: CouponModel;

  constructor(data: IDataCouponCreatedEvent) {
    this.createdBy = data.createdBy;
    this.coupon = data.coupon;
  }
}
