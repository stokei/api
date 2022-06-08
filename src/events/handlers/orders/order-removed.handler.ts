import { OrderRemovedEvent } from '@/events/implements/orders/order-removed.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(OrderRemovedEvent)
export class OrderRemovedHandler implements IEventHandler<OrderRemovedEvent> {
  async handle(event: OrderRemovedEvent) {
    const { order } = event;
    Logger.log(`#${order.id} - removed!`, OrderRemovedHandler.name);
    return event;
  }
}
