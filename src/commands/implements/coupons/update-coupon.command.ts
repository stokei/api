import { ICommand } from '@nestjs/cqrs';

import {
  UpdateCouponDataDTO,
  UpdateCouponDTO,
  UpdateCouponWhereDTO
} from '@/dtos/coupons/update-coupon.dto';

export class UpdateCouponCommand implements ICommand, UpdateCouponDTO {
  data: UpdateCouponDataDTO;
  where: UpdateCouponWhereDTO;
  constructor(data: UpdateCouponDTO) {
    this.data = data.data;
    this.where = data.where;
  }
}
