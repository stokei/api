import { HttpStatus, Injectable } from '@nestjs/common';
import { IBaseService } from '@stokei/nestjs';

import { WebhookStripeCheckoutSessionDTO } from '@/dtos/webhooks/webhook-stripe-checkout-session-completed.dto';
import { PaymentNotFoundException } from '@/errors';
import { ChangePaymentToPaymentErrorService } from '@/services/payments/change-payment-to-payment-error';
import { FindPaymentByIdService } from '@/services/payments/find-payment-by-id';
import { FindStripeCheckoutSessionByIdService } from '@/services/stripe/find-checkout-session-by-id';

import { WebhookFindStripePaymentMethodService } from '../find-stripe-payment-method';

@Injectable()
export class WebhookStripeCheckoutSessionAsyncPaymentFailedService
  implements IBaseService<WebhookStripeCheckoutSessionDTO, Promise<HttpStatus>>
{
  constructor(
    private readonly findStripeCheckoutSessionByIdService: FindStripeCheckoutSessionByIdService,
    private readonly findPaymentByIdService: FindPaymentByIdService,
    private readonly webhookFindStripePaymentMethodService: WebhookFindStripePaymentMethodService,
    private readonly changePaymentToPaymentErrorService: ChangePaymentToPaymentErrorService
  ) {}

  async execute(data: WebhookStripeCheckoutSessionDTO) {
    const stripeCheckoutSession =
      await this.findStripeCheckoutSessionByIdService.execute(
        data.stripeCheckoutSession,
        data.stripeAccount
      );
    const payment = await this.findPaymentByIdService.execute(
      stripeCheckoutSession?.metadata?.payment
    );
    if (!payment) {
      throw new PaymentNotFoundException();
    }
    const paymentMethod =
      await this.webhookFindStripePaymentMethodService.execute({
        payment,
        stripeCheckoutSession: stripeCheckoutSession?.id,
        stripeAccount: data.stripeAccount
      });

    await this.changePaymentToPaymentErrorService.execute({
      payment: payment.id,
      app: payment.app,
      stripeCheckoutSession: stripeCheckoutSession?.id,
      paymentMethod: paymentMethod?.id,
      updatedBy: payment.createdBy
    });

    return HttpStatus.OK;
  }
}
