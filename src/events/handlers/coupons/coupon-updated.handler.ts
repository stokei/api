import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { CouponUpdatedEvent } from '@/events/implements/coupons/coupon-updated.event';

@EventsHandler(CouponUpdatedEvent)
export class CouponUpdatedHandler implements IEventHandler<CouponUpdatedEvent> {
  async handle(event: CouponUpdatedEvent) {
    const { coupon } = event;
    Logger.log(`#${coupon.id} - updated!`, CouponUpdatedHandler.name);
    return event;
  }
}
