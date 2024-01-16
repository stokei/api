import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CreateCouponCommand } from '@/commands/implements/coupons/create-coupon.command';
import { CreateCouponDTO } from '@/dtos/coupons/create-coupon.dto';
import { CouponModel } from '@/models/coupon.model';

@Injectable()
export class CreateCouponService
  implements IBaseService<CreateCouponDTO, Promise<CouponModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreateCouponDTO): Promise<CouponModel> {
    return await this.commandBus.execute(new CreateCouponCommand(data));
  }
}
