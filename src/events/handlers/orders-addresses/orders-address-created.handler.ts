import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { OrdersAddressCreatedEvent } from '@/events/implements/orders-addresses/orders-address-created.event';

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
