import { Injectable } from '@nestjs/common';
import { cleanObject, IBaseService } from '@stokei/nestjs';
import Stripe from 'stripe';

import { stripeClient } from '@/clients/stripe';
import { UpdateStripeSubscriptionItemDTO } from '@/dtos/stripe/update-stripe-subscription-item.dto';

@Injectable()
export class UpdateStripeSubscriptionItemService
  implements
    IBaseService<
      UpdateStripeSubscriptionItemDTO,
      Promise<Stripe.Response<Stripe.SubscriptionItem>>
    >
{
  async execute({
    data,
    where
  }: UpdateStripeSubscriptionItemDTO): Promise<
    Stripe.Response<Stripe.SubscriptionItem>
  > {
    return stripeClient.subscriptionItems.update(
      where.stripeSubscriptionItem,
      cleanObject({
        quantity: data.quantity
      }),
      { stripeAccount: where.stripeAccount }
    );
  }
}
