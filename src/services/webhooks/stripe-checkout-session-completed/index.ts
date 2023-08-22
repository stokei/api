import { HttpStatus, Injectable } from '@nestjs/common';
import { IBaseService } from '@stokei/nestjs';

import { WebhookStripeCheckoutSessionDTO } from '@/dtos/webhooks/webhook-stripe-checkout-session-completed.dto';
import { FindStripeCheckoutSessionByIdService } from '@/services/stripe/find-checkout-session-by-id';

import { WebhookStripeCheckoutSessionAsyncPaymentSucceededService } from '../stripe-checkout-session-async-payment-succeeded';

@Injectable()
export class WebhookStripeCheckoutSessionService
  implements IBaseService<WebhookStripeCheckoutSessionDTO, Promise<HttpStatus>>
{
  constructor(
    private readonly findStripeCheckoutSessionByIdService: FindStripeCheckoutSessionByIdService,
    private readonly webhookStripeCheckoutSessionAsyncPaymentSucceededService: WebhookStripeCheckoutSessionAsyncPaymentSucceededService
  ) {}

  async execute(data: WebhookStripeCheckoutSessionDTO) {
    const stripeCheckoutSession =
      await this.findStripeCheckoutSessionByIdService.execute(
        data.stripeCheckoutSession,
        data.stripeAccount
      );

    if (stripeCheckoutSession?.payment_status === 'paid') {
      await this.webhookStripeCheckoutSessionAsyncPaymentSucceededService.execute(
        {
          stripeAccount: data.stripeAccount,
          stripeCheckoutSession: stripeCheckoutSession?.id
        }
      );
    }
    return HttpStatus.OK;
  }
}
