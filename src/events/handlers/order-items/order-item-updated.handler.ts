import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { OrderItemUpdatedEvent } from '@/events/implements/order-items/order-item-updated.event';

@EventsHandler(OrderItemUpdatedEvent)
export class OrderItemUpdatedHandler
  implements IEventHandler<OrderItemUpdatedEvent>
{
  async handle(event: OrderItemUpdatedEvent) {
    const { orderItem } = event;
    Logger.log(`#${orderItem.id} - updated!`, OrderItemUpdatedHandler.name);
    return event;
  }
}
