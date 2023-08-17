import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { PaymentChangedToPaymentErrorEvent } from '@/events/implements/payments/payment-changed-to-payment-error.event';

@EventsHandler(PaymentChangedToPaymentErrorEvent)
export class PaymentChangedToPaymentErrorHandler
  implements IEventHandler<PaymentChangedToPaymentErrorEvent>
{
  async handle(event: PaymentChangedToPaymentErrorEvent) {
    const { payment } = event;
    Logger.log(
      `#${payment.id} - changed to payment error!`,
      PaymentChangedToPaymentErrorHandler.name
    );
    return event;
  }
}
