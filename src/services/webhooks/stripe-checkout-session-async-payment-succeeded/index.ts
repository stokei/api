import { HttpStatus, Injectable } from '@nestjs/common';
import { IBaseService } from '@stokei/nestjs';
import Stripe from 'stripe';

import { WebhookStripeCheckoutSessionDTO } from '@/dtos/webhooks/webhook-stripe-checkout-session-completed.dto';
import { PaymentMethodModel } from '@/models/payment-method.model';
import { CreatePaymentMethodService } from '@/services/payment-methods/create-payment-method';
import { FindPaymentMethodByStripePaymentMethodService } from '@/services/payment-methods/find-payment-method-by-stripe-payment-method';
import { FindStripeCheckoutSessionByIdService } from '@/services/stripe/find-checkout-session-by-id';
import { ActivateSubscriptionContractService } from '@/services/subscription-contracts/activate-subscription-contract';
import { FindSubscriptionContractByStripeCheckoutSessionService } from '@/services/subscription-contracts/find-subscription-contract-by-stripe-checkout-session';

@Injectable()
export class WebhookStripeCheckoutSessionAsyncPaymentSucceededService
  implements IBaseService<WebhookStripeCheckoutSessionDTO, Promise<HttpStatus>>
{
  constructor(
    private readonly findStripeCheckoutSessionByIdService: FindStripeCheckoutSessionByIdService,
    private readonly findSubscriptionContractByStripeCheckoutSessionService: FindSubscriptionContractByStripeCheckoutSessionService,
    private readonly createPaymentMethodService: CreatePaymentMethodService,
    private readonly findPaymentMethodByStripePaymentMethodService: FindPaymentMethodByStripePaymentMethodService,
    private readonly activateSubscriptionContractService: ActivateSubscriptionContractService
  ) {}

  async execute(data: WebhookStripeCheckoutSessionDTO) {
    const stripeCheckoutSession =
      await this.findStripeCheckoutSessionByIdService.execute(
        data.stripeCheckoutSession,
        data.stripeAccount
      );
    const stripeSubscription: Stripe.Subscription =
      stripeCheckoutSession?.subscription as Stripe.Subscription;
    const subscriptionContract =
      await this.findSubscriptionContractByStripeCheckoutSessionService.execute(
        stripeCheckoutSession?.id
      );

    let paymentMethod: PaymentMethodModel;
    if (stripeCheckoutSession?.payment_intent) {
      const paymentIntent: Stripe.PaymentIntent =
        stripeCheckoutSession?.payment_intent as Stripe.PaymentIntent;
      try {
        paymentMethod =
          await this.findPaymentMethodByStripePaymentMethodService.execute(
            paymentIntent?.payment_method?.toString()
          );
      } catch (error) {
        paymentMethod = await this.createPaymentMethodService.execute({
          parent: subscriptionContract?.parent,
          app: subscriptionContract.app,
          createdBy: subscriptionContract.updatedBy,
          stripePaymentMethod: paymentIntent?.payment_method?.toString()
        });
      }
    }

    await this.activateSubscriptionContractService.execute({
      subscriptionContract: subscriptionContract.id,
      app: subscriptionContract.app,
      startAt:
        stripeSubscription?.current_period_start &&
        stripeSubscription?.current_period_start * 1000,
      endAt:
        stripeSubscription?.current_period_end &&
        stripeSubscription?.current_period_end * 1000,
      updatedBy: subscriptionContract.updatedBy,
      paymentMethod: paymentMethod?.id
    });

    return HttpStatus.OK;
  }
}
