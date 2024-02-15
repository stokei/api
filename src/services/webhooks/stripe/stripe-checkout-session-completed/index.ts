import { HttpStatus, Injectable } from '@nestjs/common';
import { IBaseService } from '@stokei/nestjs';

import { WebhookStripeCheckoutSessionDTO } from '@/dtos/webhooks/webhook-stripe-checkout-session-completed.dto';

import { WebhookStripeCheckoutSessionAsyncPaymentSucceededService } from '../stripe-checkout-session-async-payment-succeeded';

@Injectable()
export class WebhookStripeCheckoutSessionService
  implements IBaseService<WebhookStripeCheckoutSessionDTO, Promise<HttpStatus>>
{
  constructor(
    private readonly webhookStripeCheckoutSessionAsyncPaymentSucceededService: WebhookStripeCheckoutSessionAsyncPaymentSucceededService
  ) {}

  async execute(data: WebhookStripeCheckoutSessionDTO) {
    const stripeCheckoutSession = data.stripeCheckoutSession;
    if (stripeCheckoutSession?.payment_status === 'paid') {
      await this.webhookStripeCheckoutSessionAsyncPaymentSucceededService.execute(
        {
          stripeAccount: data.stripeAccount,
          stripeCheckoutSession
        }
      );
    }
    return HttpStatus.OK;
  }
}
