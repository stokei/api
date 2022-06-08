import { OrdersSellerCreatedEvent } from '@/events/implements/orders-sellers/orders-seller-created.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

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
