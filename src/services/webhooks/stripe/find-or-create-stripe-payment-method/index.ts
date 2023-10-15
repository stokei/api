import { Injectable } from '@nestjs/common';
import { IBaseService } from '@stokei/nestjs';
import Stripe from 'stripe';

import { WebhookFindOrCreateStripePaymentMethodDTO } from '@/dtos/webhooks/webhook-find-or-create-stripe-payment-method.dto';
import { PaymentMethodType } from '@/enums/payment-method-type.enum';
import { PaymentMethodModel } from '@/models/payment-method.model';
import { CreatePaymentMethodCardService } from '@/services/payment-methods/create-payment-method-card';
import { FindPaymentMethodByIdService } from '@/services/payment-methods/find-payment-method-by-id';
import { FindPaymentMethodByStripePaymentMethodService } from '@/services/payment-methods/find-payment-method-by-stripe-payment-method';
import { UpdatePaymentMethodService } from '@/services/payment-methods/update-payment-method';
import { AttachStripePaymentMethodToCustomerService } from '@/services/stripe/attach-stripe-payment-method-to-customer';
import { FindStripeCheckoutSessionByIdService } from '@/services/stripe/find-checkout-session-by-id';
import { FindStripePaymentMethodByIdService } from '@/services/stripe/find-payment-method-by-id';
import { getValueFromObjectOrString } from '@/utils/get-value-from-object-or-string';

@Injectable()
export class WebhookFindOrCreateStripePaymentMethodService
  implements
    IBaseService<
      WebhookFindOrCreateStripePaymentMethodDTO,
      Promise<PaymentMethodModel>
    >
{
  constructor(
    private readonly createPaymentMethodCardService: CreatePaymentMethodCardService,
    private readonly updatePaymentMethodService: UpdatePaymentMethodService,
    private readonly findPaymentMethodByStripePaymentMethodService: FindPaymentMethodByStripePaymentMethodService,
    private readonly findPaymentMethodByIdService: FindPaymentMethodByIdService,
    private readonly findStripeCheckoutSessionByIdService: FindStripeCheckoutSessionByIdService,
    private readonly findStripePaymentMethodByIdService: FindStripePaymentMethodByIdService,
    private readonly attachStripePaymentMethodToCustomerService: AttachStripePaymentMethodToCustomerService
  ) {}

  async execute(data: WebhookFindOrCreateStripePaymentMethodDTO) {
    const stripeCheckoutSession =
      await this.findStripeCheckoutSessionByIdService.execute(
        data.stripeCheckoutSession,
        data.stripeAccount
      );
    const stripePaymentMethodId = this.getStripePaymentMethodId(
      stripeCheckoutSession
    );
    const existsPaymentMethodId =
      !!stripePaymentMethodId ||
      !!stripeCheckoutSession?.metadata?.paymentMethod;
    if (!existsPaymentMethodId) {
      return;
    }

    const payment = data.payment;
    const stripePaymentMethod =
      await this.findStripePaymentMethodByIdService.execute(
        stripePaymentMethodId,
        data.stripeAccount
      );
    const lastFourCardNumber = stripePaymentMethod?.card?.last4;
    const cardBrand = stripePaymentMethod?.card?.brand;
    const cardExpiryMonth = stripePaymentMethod?.card?.exp_month?.toString();
    const cardExpiryYear = stripePaymentMethod?.card?.exp_year?.toString();

    if (stripeCheckoutSession?.metadata?.paymentMethod) {
      const paymentMethod = await this.findPaymentMethodByIdService.execute(
        stripeCheckoutSession?.metadata?.paymentMethod
      );

      const getPaymentMethodType = () => {
        const types = {
          card: PaymentMethodType.CARD,
          boleto: PaymentMethodType.BOLETO
        };
        return types[stripePaymentMethod?.type];
      };
      const paymentMethodType = getPaymentMethodType();
      if (!!paymentMethod && !!paymentMethodType) {
        return await this.updatePaymentMethodService.execute({
          where: {
            paymentMethod: paymentMethod?.id
          },
          data: {
            cardBrand,
            cardExpiryMonth,
            cardExpiryYear,
            lastFourCardNumber,
            paymentMethodType,
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
          const paymentMethodCreated =
            await this.createPaymentMethodCardService.execute({
              parent: payment?.parent,
              app: payment.app,
              cardBrand,
              cardExpiryMonth,
              cardExpiryYear,
              lastFourCardNumber,
              createdBy: payment.updatedBy,
              stripePaymentMethod: stripePaymentMethod?.id
            });
          if (paymentMethodCreated) {
            await this.attachStripePaymentMethodToCustomerService.execute({
              app: payment.app,
              customer: getValueFromObjectOrString(
                stripeCheckoutSession?.customer,
                'id'
              ),
              paymentMethod: stripePaymentMethod?.id,
              stripeAccount: data.stripeAccount
            });
          }
        }
      } catch (error) {}
    }
    return;
  }

  getStripePaymentMethodId(checkoutSession: Stripe.Checkout.Session) {
    const stripePaymentIntent = checkoutSession?.payment_intent;
    const stripeSubscription = checkoutSession?.subscription;
    const paymentIntentPaymentMethod = getValueFromObjectOrString(
      stripePaymentIntent,
      'payment_method'
    );
    if (paymentIntentPaymentMethod) {
      return getValueFromObjectOrString(paymentIntentPaymentMethod, 'id');
    }
    const subscriptionPaymentMethod = getValueFromObjectOrString(
      stripeSubscription,
      'default_payment_method'
    );
    if (subscriptionPaymentMethod) {
      return getValueFromObjectOrString(subscriptionPaymentMethod, 'id');
    }
    return;
  }
}
