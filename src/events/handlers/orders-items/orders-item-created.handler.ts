import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { OrdersItemCreatedEvent } from '@/events/implements/orders-items/orders-item-created.event';

@EventsHandler(OrdersItemCreatedEvent)
export class OrdersItemCreatedHandler
  implements IEventHandler<OrdersItemCreatedEvent>
{
  async handle(event: OrdersItemCreatedEvent) {
    const { ordersItem } = event;
    Logger.log(`#${ordersItem.id} - created!`, OrdersItemCreatedHandler.name);
    return event;
  }
}
