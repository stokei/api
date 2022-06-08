import { OrdersSellerUpdatedEvent } from '@/events/implements/orders-sellers/orders-seller-updated.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

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
