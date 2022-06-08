import { OrdersAddressUpdatedEvent } from '@/events/implements/orders-addresses/orders-address-updated.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(OrdersAddressUpdatedEvent)
export class OrdersAddressUpdatedHandler
  implements IEventHandler<OrdersAddressUpdatedEvent>
{
  async handle(event: OrdersAddressUpdatedEvent) {
    const { ordersAddress } = event;
    Logger.log(
      `#${ordersAddress.id} - updated!`,
      OrdersAddressUpdatedHandler.name
    );
    return event;
  }
}
