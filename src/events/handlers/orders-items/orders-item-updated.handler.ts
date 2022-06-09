import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { OrdersItemUpdatedEvent } from '@/events/implements/orders-items/orders-item-updated.event';

@EventsHandler(OrdersItemUpdatedEvent)
export class OrdersItemUpdatedHandler
  implements IEventHandler<OrdersItemUpdatedEvent>
{
  async handle(event: OrdersItemUpdatedEvent) {
    const { ordersItem } = event;
    Logger.log(`#${ordersItem.id} - updated!`, OrdersItemUpdatedHandler.name);
    return event;
  }
}
