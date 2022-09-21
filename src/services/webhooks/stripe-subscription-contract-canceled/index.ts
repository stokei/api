import { HttpStatus, Injectable } from '@nestjs/common';
import { IBaseService } from '@stokei/nestjs';

import { CancelSubscriptionContractService } from '@/services/subscription-contracts/cancel-subscription-contract';
import { FindSubscriptionContractByStripeSubscriptionService } from '@/services/subscription-contracts/find-subscription-contract-by-stripe-subscription';

@Injectable()
export class WebhookStripeSubscriptionContractCanceledService
  implements IBaseService<string, Promise<HttpStatus>>
{
  constructor(
    private readonly findSubscriptionContractByStripeSubscriptionService: FindSubscriptionContractByStripeSubscriptionService,
    private readonly cancelSubscriptionContractService: CancelSubscriptionContractService
  ) {}

  async execute(stripeSubscription: string) {
    const subscriptionContract =
      await this.findSubscriptionContractByStripeSubscriptionService.execute(
        stripeSubscription as string
      );

    await this.cancelSubscriptionContractService.execute({
      app: subscriptionContract.app,
      subscriptionContract: subscriptionContract.id,
      updatedBy: subscriptionContract.createdBy
    });
    return HttpStatus.OK;
  }
}
