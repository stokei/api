import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { OrdersItemRemovedEvent } from '@/events/implements/orders-items/orders-item-removed.event';

@EventsHandler(OrdersItemRemovedEvent)
export class OrdersItemRemovedHandler
  implements IEventHandler<OrdersItemRemovedEvent>
{
  async handle(event: OrdersItemRemovedEvent) {
    const { ordersItem } = event;
    Logger.log(`#${ordersItem.id} - removed!`, OrdersItemRemovedHandler.name);
    return event;
  }
}
