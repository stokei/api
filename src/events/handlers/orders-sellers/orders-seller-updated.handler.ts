import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { OrdersSellerUpdatedEvent } from '@/events/implements/orders-sellers/orders-seller-updated.event';

@EventsHandler(OrdersSellerUpdatedEvent)
export class OrdersSellerUpdatedHandler
  implements IEventHandler<OrdersSellerUpdatedEvent>
{
  async handle(event: OrdersSellerUpdatedEvent) {
    const { ordersSeller } = event;
    Logger.log(
      `#${ordersSeller.id} - updated!`,
      OrdersSellerUpdatedHandler.name
    );
    return event;
  }
}
