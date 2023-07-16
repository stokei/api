import { HttpStatus, Injectable } from '@nestjs/common';
import { convertToISODateString, IBaseService } from '@stokei/nestjs';
import Stripe from 'stripe';

import { WebhookStripeCheckoutSessionDTO } from '@/dtos/webhooks/webhook-stripe-checkout-session-completed.dto';
import {
  PriceNotFoundException,
  ProductNotFoundException,
  SubscriptionContractItemNotFoundException,
  SubscriptionContractNotFoundException
} from '@/errors';
import { FindAccountByIdService } from '@/services/accounts/find-account-by-id';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';
import { FindPricesByStripePriceIdsService } from '@/services/prices/find-prices-by-stripe-price-ids';
import { FindProductByIdService } from '@/services/products/find-product-by-id';
import { FindStripeCheckoutSessionByIdService } from '@/services/stripe/find-checkout-session-by-id';
import { CreateSubscriptionContractItemService } from '@/services/subscription-contract-items/create-subscription-contract-item';
import { CreateSubscriptionContractService } from '@/services/subscription-contracts/create-subscription-contract';
import { UpdateSubscriptionContractService } from '@/services/subscription-contracts/update-subscription-contract';

import { WebhookStripeCheckoutSessionAsyncPaymentSucceededService } from '../stripe-checkout-session-async-payment-succeeded';

@Injectable()
export class WebhookStripeCheckoutSessionService
  implements IBaseService<WebhookStripeCheckoutSessionDTO, Promise<HttpStatus>>
{
  constructor(
    private readonly findAppByIdService: FindAppByIdService,
    private readonly findAccountByIdService: FindAccountByIdService,
    private readonly findProductByIdService: FindProductByIdService,
    private readonly findPricesByStripePriceIdsService: FindPricesByStripePriceIdsService,
    private readonly findStripeCheckoutSessionByIdService: FindStripeCheckoutSessionByIdService,
    private readonly updateSubscriptionContractService: UpdateSubscriptionContractService,
    private readonly webhookStripeCheckoutSessionAsyncPaymentSucceededService: WebhookStripeCheckoutSessionAsyncPaymentSucceededService,
    private readonly createSubscriptionContractItemService: CreateSubscriptionContractItemService,
    private readonly createSubscriptionContractService: CreateSubscriptionContractService
  ) {}

  async execute(data: WebhookStripeCheckoutSessionDTO) {
    const stripeCheckoutSession =
      await this.findStripeCheckoutSessionByIdService.execute(
        data.stripeCheckoutSession,
        data.stripeAccount
      );
    const stripeSubscription: Stripe.Subscription =
      stripeCheckoutSession?.subscription as Stripe.Subscription;

    const customer = await this.findAccountByIdService.execute(
      stripeCheckoutSession.client_reference_id
    );
    const customerApp = await this.findAppByIdService.execute(customer?.app);
    const prices = await this.findPricesByStripePriceIdsService.execute([
      stripeCheckoutSession?.line_items?.data?.[0]?.price?.id
    ]);
    if (!prices?.length) {
      throw new PriceNotFoundException();
    }
    const price = prices[0];
    const product = await this.findProductByIdService.execute(price.parent);
    if (!product) {
      throw new ProductNotFoundException();
    }

    const subscriptionContract =
      await this.createSubscriptionContractService.execute({
        app: customerApp.id,
        createdBy: customer.id,
        parent: customer.id,
        stripeCheckoutSession: stripeCheckoutSession?.id,
        stripeSubscription: stripeSubscription?.id,
        createdByAdmin: false,
        startAt: stripeSubscription.current_period_start
          ? convertToISODateString(
              stripeSubscription.current_period_start * 1000
            )
          : undefined,
        endAt: stripeSubscription.current_period_end
          ? convertToISODateString(stripeSubscription.current_period_end * 1000)
          : undefined,
        type: price.type,
        automaticRenew: false
      });
    if (!subscriptionContract) {
      throw new SubscriptionContractNotFoundException();
    }

    const subscriptionContractItem =
      await this.createSubscriptionContractItemService.execute({
        app: customerApp.id,
        product: product.parent,
        price: price.id,
        recurring: price.recurring,
        parent: subscriptionContract.id,
        quantity: 1,
        createdBy: customer.id,
        createdByAdmin: true,
        stripeSubscriptionItem: stripeSubscription?.items?.data?.[0]?.id
      });
    if (!subscriptionContractItem) {
      throw new SubscriptionContractItemNotFoundException();
    }

    await this.updateSubscriptionContractService.execute({
      data: {
        stripeSubscription: stripeSubscription?.id,
        updatedBy: subscriptionContract.updatedBy
      },
      where: {
        app: subscriptionContract.app,
        subscriptionContract: subscriptionContract.id
      }
    });

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
