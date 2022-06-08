import { OrdersAddressCreatedEvent } from '@/events/implements/orders-addresses/orders-address-created.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(OrdersAddressCreatedEvent)
export class OrdersAddressCreatedHandler
  implements IEventHandler<OrdersAddressCreatedEvent>
{
  async handle(event: OrdersAddressCreatedEvent) {
    const { ordersAddress } = event;
    Logger.log(
      `#${ordersAddress.id} - created!`,
      OrdersAddressCreatedHandler.name
    );
    return event;
  }
}
