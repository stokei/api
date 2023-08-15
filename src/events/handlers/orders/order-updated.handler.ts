import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { OrderUpdatedEvent } from '@/events/implements/orders/order-updated.event';

@EventsHandler(OrderUpdatedEvent)
export class OrderUpdatedHandler implements IEventHandler<OrderUpdatedEvent> {
  async handle(event: OrderUpdatedEvent) {
    const { order } = event;
    Logger.log(`#${order.id} - updated!`, OrderUpdatedHandler.name);
    return event;
  }
}
