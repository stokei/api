import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { OrderItemCreatedEvent } from '@/events/implements/order-items/order-item-created.event';

@EventsHandler(OrderItemCreatedEvent)
export class OrderItemCreatedHandler
  implements IEventHandler<OrderItemCreatedEvent>
{
  async handle(event: OrderItemCreatedEvent) {
    const { orderItem } = event;
    Logger.log(`#${orderItem.id} - created!`, OrderItemCreatedHandler.name);
    return event;
  }
}
