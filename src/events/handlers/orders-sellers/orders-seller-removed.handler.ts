import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { OrdersSellerRemovedEvent } from '@/events/implements/orders-sellers/orders-seller-removed.event';

@EventsHandler(OrdersSellerRemovedEvent)
export class OrdersSellerRemovedHandler
  implements IEventHandler<OrdersSellerRemovedEvent>
{
  async handle(event: OrdersSellerRemovedEvent) {
    const { ordersSeller } = event;
    Logger.log(
      `#${ordersSeller.id} - removed!`,
      OrdersSellerRemovedHandler.name
    );
    return event;
  }
}
