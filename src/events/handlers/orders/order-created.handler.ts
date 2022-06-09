import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { OrderCreatedEvent } from '@/events/implements/orders/order-created.event';

@EventsHandler(OrderCreatedEvent)
export class OrderCreatedHandler implements IEventHandler<OrderCreatedEvent> {
  async handle(event: OrderCreatedEvent) {
    const { order } = event;
    Logger.log(`#${order.id} - created!`, OrderCreatedHandler.name);
    return event;
  }
}
