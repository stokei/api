import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import {
  cleanObject,
  cleanValue,
  cleanValueBoolean,
  cleanValueNumber,
  splitServiceId
} from '@stokei/nestjs';

import { UpdateCouponCommand } from '@/commands/implements/coupons/update-coupon.command';
import {
  CouponNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindCouponByIdRepository } from '@/repositories/coupons/find-coupon-by-id';
import { UpdateCouponRepository } from '@/repositories/coupons/update-coupon';

@CommandHandler(UpdateCouponCommand)
export class UpdateCouponCommandHandler
  implements ICommandHandler<UpdateCouponCommand>
{
  constructor(
    private readonly findCouponByIdRepository: FindCouponByIdRepository,
    private readonly updateCouponRepository: UpdateCouponRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdateCouponCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!!data?.data?.amountOff && data?.data?.amountOff <= 0) {
      throw new ParamNotFoundException('amountOff');
    }
    if (
      !!data?.data?.percentOff &&
      (data?.data?.percentOff <= 0 || data?.data?.percentOff > 100)
    ) {
      throw new ParamNotFoundException('percentOff');
    }

    const couponId = splitServiceId(data.where?.coupon)?.id;
    if (!couponId) {
      throw new ParamNotFoundException('couponId');
    }

    const coupon = await this.findCouponByIdRepository.execute(couponId);
    if (!coupon) {
      throw new CouponNotFoundException();
    }

    const updated = await this.updateCouponRepository.execute({
      ...data,
      where: {
        ...data.where,
        coupon: couponId
      }
    });
    if (!updated) {
      throw new DataNotFoundException();
    }

    const couponUpdated = await this.findCouponByIdRepository.execute(couponId);
    if (!couponUpdated) {
      throw new CouponNotFoundException();
    }
    const couponModel = this.publisher.mergeObjectContext(couponUpdated);
    couponModel.updatedCoupon({
      updatedBy: data.data.updatedBy
    });
    couponModel.commit();

    return couponUpdated;
  }

  private clearData(command: UpdateCouponCommand): UpdateCouponCommand {
    return cleanObject({
      where: {
        app: cleanValue(command?.where?.app),
        coupon: cleanValue(command?.where?.coupon)
      },
      data: {
        code: cleanValue(command?.data?.code),
        active: cleanValueBoolean(command?.data?.active),
        amountOff: cleanValueNumber(command?.data?.amountOff),
        percentOff: cleanValueNumber(command?.data?.percentOff),
        updatedBy: cleanValue(command?.data?.updatedBy)
      }
    });
  }
}
