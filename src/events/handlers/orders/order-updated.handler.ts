import { OrderUpdatedEvent } from '@/events/implements/orders/order-updated.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(OrderUpdatedEvent)
export class OrderUpdatedHandler implements IEventHandler<OrderUpdatedEvent> {
  async handle(event: OrderUpdatedEvent) {
    const { order } = event;
    Logger.log(`#${order.id} - updated!`, OrderUpdatedHandler.name);
    return event;
  }
}
