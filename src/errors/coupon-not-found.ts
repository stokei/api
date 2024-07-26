import { NotFoundException } from '@nestjs/common';

export class CouponNotFoundException extends NotFoundException {
  constructor() {
    super('couponNotFound');
  }
}
