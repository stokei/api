import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { OrdersAddressRemovedEvent } from '@/events/implements/orders-addresses/orders-address-removed.event';

@EventsHandler(OrdersAddressRemovedEvent)
export class OrdersAddressRemovedHandler
  implements IEventHandler<OrdersAddressRemovedEvent>
{
  async handle(event: OrdersAddressRemovedEvent) {
    const { ordersAddress } = event;
    Logger.log(
      `#${ordersAddress.id} - removed!`,
      OrdersAddressRemovedHandler.name
    );
    return event;
  }
}
