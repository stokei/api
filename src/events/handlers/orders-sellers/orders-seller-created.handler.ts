import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { OrdersSellerCreatedEvent } from '@/events/implements/orders-sellers/orders-seller-created.event';

@EventsHandler(OrdersSellerCreatedEvent)
export class OrdersSellerCreatedHandler
  implements IEventHandler<OrdersSellerCreatedEvent>
{
  async handle(event: OrdersSellerCreatedEvent) {
    const { ordersSeller } = event;
    Logger.log(
      `#${ordersSeller.id} - created!`,
      OrdersSellerCreatedHandler.name
    );
    return event;
  }
}
