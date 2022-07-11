import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { OrderItemRemovedEvent } from '@/events/implements/order-items/order-item-removed.event';

@EventsHandler(OrderItemRemovedEvent)
export class OrderItemRemovedHandler
  implements IEventHandler<OrderItemRemovedEvent>
{
  async handle(event: OrderItemRemovedEvent) {
    const { orderItem } = event;
    Logger.log(`#${orderItem.id} - removed!`, OrderItemRemovedHandler.name);
    return event;
  }
}
