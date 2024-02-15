import { HttpStatus, Injectable } from '@nestjs/common';
import { IBaseService } from '@stokei/nestjs';

import { WebhookStripeCheckoutSessionDTO } from '@/dtos/webhooks/webhook-stripe-checkout-session-completed.dto';
import { PaymentNotFoundException } from '@/errors';
import { ChangePaymentToPaidService } from '@/services/payments/change-payment-to-paid';
import { FindPaymentByIdService } from '@/services/payments/find-payment-by-id';

@Injectable()
export class WebhookStripeCheckoutSessionAsyncPaymentSucceededService
  implements IBaseService<WebhookStripeCheckoutSessionDTO, Promise<HttpStatus>>
{
  constructor(
    private readonly findPaymentByIdService: FindPaymentByIdService,
    private readonly changePaymentToPaidService: ChangePaymentToPaidService
  ) {}

  async execute(data: WebhookStripeCheckoutSessionDTO) {
    const stripeCheckoutSession = data.stripeCheckoutSession;

    const payment = await this.findPaymentByIdService.execute(
      stripeCheckoutSession?.metadata?.payment
    );
    if (!payment) {
      throw new PaymentNotFoundException();
    }

    await this.changePaymentToPaidService.execute({
      payment: payment.id,
      app: payment.app,
      stripeCheckoutSession: stripeCheckoutSession?.id,
      updatedBy: payment.createdBy
    });

    return HttpStatus.OK;
  }
}
