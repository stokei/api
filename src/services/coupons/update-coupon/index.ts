import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { UpdateCouponCommand } from '@/commands/implements/coupons/update-coupon.command';
import { UpdateCouponDTO } from '@/dtos/coupons/update-coupon.dto';
import { CouponModel } from '@/models/coupon.model';

@Injectable()
export class UpdateCouponService
  implements IBaseService<UpdateCouponDTO, Promise<CouponModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: UpdateCouponDTO): Promise<CouponModel> {
    return await this.commandBus.execute(new UpdateCouponCommand(data));
  }
}
