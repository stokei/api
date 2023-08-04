import { HttpStatus, Injectable } from '@nestjs/common';
import { convertToISODateString, IBaseService } from '@stokei/nestjs';
import Stripe from 'stripe';

import { WebhookStripeCheckoutSessionDTO } from '@/dtos/webhooks/webhook-stripe-checkout-session-completed.dto';
import { SubscriptionContractNotFoundException } from '@/errors';
import { PaymentMethodModel } from '@/models/payment-method.model';
import { CreatePaymentMethodBoletoService } from '@/services/payment-methods/create-payment-method-boleto';
import { CreatePaymentMethodCardService } from '@/services/payment-methods/create-payment-method-card';
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
    private readonly createPaymentMethodBoletoService: CreatePaymentMethodBoletoService,
    private readonly createPaymentMethodCardService: CreatePaymentMethodCardService,
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
    if (!subscriptionContract) {
      throw new SubscriptionContractNotFoundException();
    }

    let paymentMethod: PaymentMethodModel;
    if (stripeCheckoutSession?.payment_intent) {
      const paymentIntent: Stripe.PaymentIntent =
        stripeCheckoutSession?.payment_intent as Stripe.PaymentIntent;
      const stripePaymentMethod: Stripe.PaymentMethod =
        paymentIntent?.payment_method as Stripe.PaymentMethod;
      if (!!stripePaymentMethod) {
        try {
          paymentMethod =
            await this.findPaymentMethodByStripePaymentMethodService.execute(
              stripePaymentMethod?.id
            );
        } catch (error) {
          try {
            if (stripePaymentMethod.type === 'card') {
              paymentMethod = await this.createPaymentMethodCardService.execute(
                {
                  parent: subscriptionContract?.parent,
                  app: subscriptionContract.app,
                  createdBy: subscriptionContract.updatedBy,
                  stripePaymentMethod: paymentIntent?.payment_method?.toString()
                }
              );
            } else if (stripePaymentMethod.type === 'boleto') {
              paymentMethod =
                await this.createPaymentMethodBoletoService.execute({
                  app: subscriptionContract.app,
                  createdBy: subscriptionContract.updatedBy
                });
            }
          } catch (error) {}
        }
      }
    }

    await this.activateSubscriptionContractService.execute({
      subscriptionContract: subscriptionContract.id,
      app: subscriptionContract.app,
      startAt: stripeSubscription?.current_period_start
        ? convertToISODateString(
            stripeSubscription?.current_period_start * 1000
          )
        : undefined,
      endAt: stripeSubscription?.current_period_end
        ? convertToISODateString(stripeSubscription?.current_period_end * 1000)
        : undefined,
      updatedBy: subscriptionContract.updatedBy,
      paymentMethod: paymentMethod?.id
    });

    return HttpStatus.OK;
  }
}
