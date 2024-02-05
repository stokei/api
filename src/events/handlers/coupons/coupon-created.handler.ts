import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { CouponCreatedEvent } from '@/events/implements/coupons/coupon-created.event';

@EventsHandler(CouponCreatedEvent)
export class CouponCreatedHandler implements IEventHandler<CouponCreatedEvent> {
  async handle(event: CouponCreatedEvent) {
    const { coupon } = event;
    Logger.log(`#${coupon.id} - created!`, CouponCreatedHandler.name);
    return event;
  }
}
