import { HttpStatus, Injectable } from '@nestjs/common';
import { convertToISODateString, IBaseService } from '@stokei/nestjs';

import { WebhookStripeSubscriptionUpdateDTO } from '@/dtos/webhooks/webhook-stripe-subscription-update.dto';
import { FindSubscriptionContractByStripeSubscriptionService } from '@/services/subscription-contracts/find-subscription-contract-by-stripe-subscription';
import { UpdateSubscriptionContractService } from '@/services/subscription-contracts/update-subscription-contract';

@Injectable()
export class WebhookStripeSubscriptionUpdateService
  implements
    IBaseService<WebhookStripeSubscriptionUpdateDTO, Promise<HttpStatus>>
{
  constructor(
    private readonly findSubscriptionContractByStripeSubscriptionService: FindSubscriptionContractByStripeSubscriptionService,
    private readonly updateSubscriptionContractService: UpdateSubscriptionContractService
  ) {}

  async execute(data: WebhookStripeSubscriptionUpdateDTO) {
    const subscriptionContract =
      await this.findSubscriptionContractByStripeSubscriptionService.execute(
        data.stripeSubscription
      );

    await this.updateSubscriptionContractService.execute({
      data: {
        startAt: convertToISODateString(data.startAt),
        endAt: convertToISODateString(data.endAt),
        updatedBy: subscriptionContract.updatedBy
      },
      where: {
        app: subscriptionContract.app,
        subscriptionContract: subscriptionContract.id
      }
    });
    return HttpStatus.OK;
  }
}
