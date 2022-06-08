import { OrdersSellerRemovedEvent } from '@/events/implements/orders-sellers/orders-seller-removed.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

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
