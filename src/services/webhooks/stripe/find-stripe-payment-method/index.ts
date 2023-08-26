import { Injectable } from '@nestjs/common';
import { IBaseService } from '@stokei/nestjs';
import Stripe from 'stripe';

import { WebhookFindStripePaymentMethodDTO } from '@/dtos/webhooks/webhook-find-stripe-payment-method.dto';
import { PaymentMethodModel } from '@/models/payment-method.model';
import { CreatePaymentMethodCardService } from '@/services/payment-methods/create-payment-method-card';
import { FindPaymentMethodByIdService } from '@/services/payment-methods/find-payment-method-by-id';
import { FindPaymentMethodByStripePaymentMethodService } from '@/services/payment-methods/find-payment-method-by-stripe-payment-method';
import { UpdatePaymentMethodService } from '@/services/payment-methods/update-payment-method';
import { FindStripeCheckoutSessionByIdService } from '@/services/stripe/find-checkout-session-by-id';
import { FindStripePaymentMethodByIdService } from '@/services/stripe/find-payment-method-by-id';

@Injectable()
export class WebhookFindStripePaymentMethodService
  implements
    IBaseService<
      WebhookFindStripePaymentMethodDTO,
      Promise<PaymentMethodModel>
    >
{
  constructor(
    private readonly createPaymentMethodCardService: CreatePaymentMethodCardService,
    private readonly updatePaymentMethodService: UpdatePaymentMethodService,
    private readonly findPaymentMethodByStripePaymentMethodService: FindPaymentMethodByStripePaymentMethodService,
    private readonly findPaymentMethodByIdService: FindPaymentMethodByIdService,
    private readonly findStripeCheckoutSessionByIdService: FindStripeCheckoutSessionByIdService,
    private readonly findStripePaymentMethodByIdService: FindStripePaymentMethodByIdService
  ) {}

  async execute(data: WebhookFindStripePaymentMethodDTO) {
    const stripeCheckoutSession =
      await this.findStripeCheckoutSessionByIdService.execute(
        data.stripeCheckoutSession,
        data.stripeAccount
      );
    const stripePaymentMethodId = this.getStripePaymentMethodId(
      stripeCheckoutSession
    );
    if (
      !stripePaymentMethodId &&
      !stripeCheckoutSession?.metadata?.paymentMethod
    ) {
      return;
    }
    const stripePaymentMethod =
      await this.findStripePaymentMethodByIdService.execute(
        stripePaymentMethodId
      );
    const payment = data.payment;
    if (stripeCheckoutSession?.metadata?.paymentMethod) {
      const paymentMethod = await this.findPaymentMethodByIdService.execute(
        stripeCheckoutSession?.metadata?.paymentMethod
      );

      const lastFourCardNumber = stripePaymentMethod?.card?.last4;
      const cardBrand = stripePaymentMethod?.card?.brand;
      const cardExpiryMonth = stripePaymentMethod?.card?.exp_month?.toString();
      const cardExpiryYear = stripePaymentMethod?.card?.exp_year?.toString();
      if (paymentMethod && stripePaymentMethod?.type === 'card') {
        return await this.updatePaymentMethodService.execute({
          where: {
            paymentMethod: paymentMethod?.id
          },
          data: {
            cardBrand,
            cardExpiryMonth,
            cardExpiryYear,
            lastFourCardNumber,
            updatedBy: payment.updatedBy
          }
        });
      }
    }
    try {
      return await this.findPaymentMethodByStripePaymentMethodService.execute(
        stripePaymentMethodId
      );
    } catch (error) {
      try {
        if (!stripePaymentMethod) {
          return;
        }
        if (stripePaymentMethod.type === 'card') {
          return await this.createPaymentMethodCardService.execute({
            parent: payment?.parent,
            app: payment.app,
            createdBy: payment.updatedBy,
            stripePaymentMethod: stripePaymentMethod?.id
          });
        }
      } catch (error) {}
    }
    return;
  }

  getStripePaymentMethodId(checkoutSession: Stripe.Checkout.Session) {
    const stripePaymentIntent = checkoutSession?.payment_intent;
    const stripeSubscription = checkoutSession?.subscription;
    const getIdFromObjectOrString = (objOrString: any, key: string) => {
      if (!objOrString) {
        return;
      }
      if (typeof objOrString !== 'string' && objOrString?.[key]) {
        return objOrString?.[key];
      }
      return objOrString + '';
    };
    const paymentIntentPaymentMethod = getIdFromObjectOrString(
      stripePaymentIntent,
      'payment_method'
    );
    if (paymentIntentPaymentMethod) {
      return getIdFromObjectOrString(paymentIntentPaymentMethod, 'id');
    }
    const subscriptionPaymentMethod = getIdFromObjectOrString(
      stripeSubscription,
      'default_payment_method'
    );
    if (subscriptionPaymentMethod) {
      return getIdFromObjectOrString(subscriptionPaymentMethod, 'id');
    }
    return;
  }
}
