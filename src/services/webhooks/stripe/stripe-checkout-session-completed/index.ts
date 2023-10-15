import { HttpStatus, Injectable } from '@nestjs/common';
import { IBaseService } from '@stokei/nestjs';

import { WebhookStripeCheckoutSessionDTO } from '@/dtos/webhooks/webhook-stripe-checkout-session-completed.dto';
import { FindStripeCheckoutSessionByIdService } from '@/services/stripe/find-checkout-session-by-id';
import { UpdateStripeSubscriptionService } from '@/services/stripe/update-stripe-subscription';
import { getValueFromObjectOrString } from '@/utils/get-value-from-object-or-string';

import { WebhookStripeCheckoutSessionAsyncPaymentSucceededService } from '../stripe-checkout-session-async-payment-succeeded';

@Injectable()
export class WebhookStripeCheckoutSessionService
  implements IBaseService<WebhookStripeCheckoutSessionDTO, Promise<HttpStatus>>
{
  constructor(
    private readonly updateStripeSubscriptionService: UpdateStripeSubscriptionService,
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

    if (!!stripeCheckoutSession?.subscription) {
      await this.cancelAllSubscriptionsAtPeriodEndWhenAutomatiRenewIsFalse({
        stripeAccount: data.stripeAccount,
        subscriptionId: getValueFromObjectOrString(
          stripeCheckoutSession?.subscription,
          'id'
        )
      });
    }
    return HttpStatus.OK;
  }

  async cancelAllSubscriptionsAtPeriodEndWhenAutomatiRenewIsFalse({
    subscriptionId,
    stripeAccount
  }: {
    subscriptionId: string;
    stripeAccount: string;
  }) {
    try {
      await this.updateStripeSubscriptionService.execute({
        data: {
          automaticRenew: false
        },
        where: {
          stripeSubscription: subscriptionId,
          stripeAccount
        }
      });
    } catch (error) {}
  }
}
