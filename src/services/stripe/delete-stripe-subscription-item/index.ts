import { Injectable } from '@nestjs/common';
import { IBaseService } from '@stokei/nestjs';

import { stripeClient } from '@/clients/stripe';

@Injectable()
export class DeleteStripeSubscriptionItemService
  implements IBaseService<string, Promise<boolean>>
{
  async execute(stripeSubscriptionItem: string) {
    return !!(await stripeClient.subscriptionItems.del(stripeSubscriptionItem))
      .id;
  }
}
