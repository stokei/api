import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, cleanValueNumber } from '@stokei/nestjs';

import { CreateCouponCommand } from '@/commands/implements/coupons/create-coupon.command';
import {
  CouponAlreadyExistsException,
  CouponNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CreateCouponRepository } from '@/repositories/coupons/create-coupon';
import { ExistsCouponsRepository } from '@/repositories/coupons/exists-coupons';

type CreateCouponCommandKeys = keyof CreateCouponCommand;

@CommandHandler(CreateCouponCommand)
export class CreateCouponCommandHandler
  implements ICommandHandler<CreateCouponCommand>
{
  constructor(
    private readonly createCouponRepository: CreateCouponRepository,
    private readonly existsCouponsRepository: ExistsCouponsRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateCouponCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.parent) {
      throw new ParamNotFoundException<CreateCouponCommandKeys>('parent');
    }
    if (!data?.amountOff && !data?.percentOff) {
      throw new ParamNotFoundException<CreateCouponCommandKeys>('amountOff');
    }
    if (!!data?.amountOff && data?.amountOff <= 0) {
      throw new ParamNotFoundException<CreateCouponCommandKeys>('amountOff');
    }
    if (
      !!data?.percentOff &&
      (data?.percentOff <= 0 || data?.percentOff > 100)
    ) {
      throw new ParamNotFoundException<CreateCouponCommandKeys>('percentOff');
    }

    const existsCoupon = await this.existsCouponsRepository.execute({
      where: {
        app: data.app,
        parent: data.parent,
        code: data.code
      }
    });
    if (existsCoupon) {
      throw new CouponAlreadyExistsException();
    }

    const couponCreated = await this.createCouponRepository.execute(data);
    if (!couponCreated) {
      throw new CouponNotFoundException();
    }
    const couponModel = this.publisher.mergeObjectContext(couponCreated);
    couponModel.createdCoupon({
      createdBy: data.createdBy
    });
    couponModel.commit();

    return couponCreated;
  }

  private clearData(command: CreateCouponCommand): CreateCouponCommand {
    return cleanObject({
      createdBy: cleanValue(command?.createdBy),
      parent: cleanValue(command?.parent),
      app: cleanValue(command?.app),
      code: cleanValue(command?.code),
      recipient: cleanValue(command?.recipient),
      amountOff: cleanValueNumber(command?.amountOff),
      percentOff: cleanValueNumber(command?.percentOff)
    });
  }
}
