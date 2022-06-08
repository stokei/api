import { OrderCreatedEvent } from '@/events/implements/orders/order-created.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(OrderCreatedEvent)
export class OrderCreatedHandler implements IEventHandler<OrderCreatedEvent> {
  async handle(event: OrderCreatedEvent) {
    const { order } = event;
    Logger.log(`#${order.id} - created!`, OrderCreatedHandler.name);
    return event;
  }
}
