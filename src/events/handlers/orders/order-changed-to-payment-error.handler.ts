import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { OrderChangedToPaymentErrorEvent } from '@/events/implements/orders/order-changed-to-payment-error.event';

@EventsHandler(OrderChangedToPaymentErrorEvent)
export class OrderChangedToPaymentErrorHandler
  implements IEventHandler<OrderChangedToPaymentErrorEvent>
{
  async handle(event: OrderChangedToPaymentErrorEvent) {
    const { order } = event;
    Logger.log(
      `#${order.id} - changed to payment error!`,
      OrderChangedToPaymentErrorHandler.name
    );
    return event;
  }
}
