import { Injectable } from '@nestjs/common';
import { IBaseService } from '@stokei/nestjs';
import Stripe from 'stripe';

import { PricesNotFoundException, ProductsNotFoundException } from '@/errors';
import { FindPricesByStripePriceIdsService } from '@/services/prices/find-prices-by-stripe-price-ids';
import { FindAllProductsService } from '@/services/products/find-all-products';
import { FindStripeCheckoutSessionByIdService } from '@/services/stripe/find-checkout-session-by-id';
import { CreateSubscriptionContractService } from '@/services/subscription-contracts/create-subscription-contract';

@Injectable()
export class WebhookStripeCheckoutSessionCompletedService
  implements IBaseService<string>
{
  constructor(
    private readonly findStripeCheckoutSessionByIdService: FindStripeCheckoutSessionByIdService,
    private readonly findPricesByStripePriceIdsService: FindPricesByStripePriceIdsService,
    private readonly findAllProductsService: FindAllProductsService,
    private readonly createSubscriptionContractService: CreateSubscriptionContractService
  ) {}

  async execute(checkoutSessionId: string, stripeAccount?: string) {
    const checkoutSession =
      await this.findStripeCheckoutSessionByIdService.execute(
        checkoutSessionId,
        stripeAccount
      );

    const stripeSubscription =
      checkoutSession.subscription as Stripe.Subscription;

    const priceIds = checkoutSession.line_items.data.map(
      (stripePrice) => stripePrice.price.id
    );
    const prices = await this.findPricesByStripePriceIdsService.execute(
      priceIds
    );
    if (!prices?.length) {
      throw new PricesNotFoundException();
    }
    const productIds = prices.map((price) => price.parent);
    const products = await this.findAllProductsService.execute({
      where: {
        AND: {
          ids: productIds
        }
      }
    });
    if (!products?.items?.length) {
      throw new ProductsNotFoundException();
    }

    return await Promise.all(
      prices.map(async (currentPrice) => {
        const currentProduct = products.items.find(
          (product) => product.id === currentPrice.parent
        );
        if (currentProduct) {
          await this.createSubscriptionContractService.execute({
            app: currentPrice.app,
            createdBy: currentPrice.createdBy,
            currency: currentPrice.currency,
            stripeCheckoutSession: checkoutSession.id,
            parent: checkoutSession.client_reference_id,
            product: currentProduct.parent,
            stripeSubscription: stripeSubscription.id,
            subtotalAmount: checkoutSession.amount_subtotal,
            totalAmount: checkoutSession.amount_total,
            type: currentPrice.type,
            automaticRenew: true,
            recurringIntervalCount: currentPrice.recurringIntervalCount,
            recurringIntervalType: currentPrice.recurringIntervalType
          });
        }
      })
    );
  }
}
