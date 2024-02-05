import { ICommand } from '@nestjs/cqrs';

import { CreateCouponDTO } from '@/dtos/coupons/create-coupon.dto';

export class CreateCouponCommand implements ICommand, CreateCouponDTO {
  code: string;
  parent: string;
  recipient?: string;
  amountOff?: number;
  percentOff?: number;
  app: string;
  createdBy: string;

  constructor(data: CreateCouponDTO) {
    this.code = data.code;
    this.parent = data.parent;
    this.recipient = data.recipient;
    this.amountOff = data.amountOff;
    this.percentOff = data.percentOff;
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
