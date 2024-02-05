import { BadRequestException } from '@nestjs/common';

export class CouponAlreadyExistsException extends BadRequestException {
  constructor() {
    super('couponAlreadyExists');
  }
}
