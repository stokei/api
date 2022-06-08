import { OrdersItemCreatedEvent } from '@/events/implements/orders-items/orders-item-created.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

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
