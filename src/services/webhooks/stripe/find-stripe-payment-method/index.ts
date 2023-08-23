import { Injectable } from '@nestjs/common';
import { IBaseService } from '@stokei/nestjs';
import Stripe from 'stripe';

import { WebhookFindStripePaymentMethodDTO } from '@/dtos/webhooks/webhook-find-stripe-payment-method.dto';
import { PaymentMethodModel } from '@/models/payment-method.model';
import { CreatePaymentMethodBoletoService } from '@/services/payment-methods/create-payment-method-boleto';
import { CreatePaymentMethodCardService } from '@/services/payment-methods/create-payment-method-card';
import { FindPaymentMethodByStripePaymentMethodService } from '@/services/payment-methods/find-payment-method-by-stripe-payment-method';
import { FindStripeCheckoutSessionByIdService } from '@/services/stripe/find-checkout-session-by-id';

@Injectable()
export class WebhookFindStripePaymentMethodService
  implements
    IBaseService<
      WebhookFindStripePaymentMethodDTO,
      Promise<PaymentMethodModel>
    >
{
  constructor(
    private readonly createPaymentMethodBoletoService: CreatePaymentMethodBoletoService,
    private readonly createPaymentMethodCardService: CreatePaymentMethodCardService,
    private readonly findPaymentMethodByStripePaymentMethodService: FindPaymentMethodByStripePaymentMethodService,
    private readonly findStripeCheckoutSessionByIdService: FindStripeCheckoutSessionByIdService
  ) {}

  async execute(data: WebhookFindStripePaymentMethodDTO) {
    const stripeCheckoutSession =
      await this.findStripeCheckoutSessionByIdService.execute(
        data.stripeCheckoutSession,
        data.stripeAccount
      );
    const payment = data.payment;

    const paymentIntent: Stripe.PaymentIntent =
      stripeCheckoutSession?.payment_intent as Stripe.PaymentIntent;
    let paymentMethod: PaymentMethodModel;
    if (paymentIntent) {
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
                  parent: payment?.parent,
                  app: payment.app,
                  createdBy: payment.updatedBy,
                  stripePaymentMethod: paymentIntent?.payment_method?.toString()
                }
              );
            } else if (stripePaymentMethod.type === 'boleto') {
              paymentMethod =
                await this.createPaymentMethodBoletoService.execute({
                  app: payment.app,
                  createdBy: payment.updatedBy
                });
            }
          } catch (error) {}
        }
      }
    }
    return paymentMethod;
  }
}
