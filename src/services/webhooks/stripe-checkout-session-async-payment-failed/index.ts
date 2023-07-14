import { HttpStatus, Injectable } from '@nestjs/common';
import { IBaseService } from '@stokei/nestjs';

import { WebhookStripeCheckoutSessionDTO } from '@/dtos/webhooks/webhook-stripe-checkout-session-completed.dto';
import { FindPaymentMethodByStripePaymentMethodService } from '@/services/payment-methods/find-payment-method-by-stripe-payment-method';
import { FindStripeCheckoutSessionByIdService } from '@/services/stripe/find-checkout-session-by-id';
import { CancelSubscriptionContractService } from '@/services/subscription-contracts/cancel-subscription-contract';

@Injectable()
export class WebhookStripeCheckoutSessionAsyncPaymentFailedService
  implements IBaseService<WebhookStripeCheckoutSessionDTO, Promise<HttpStatus>>
{
  constructor(
    private readonly findStripeCheckoutSessionByIdService: FindStripeCheckoutSessionByIdService,
    private readonly findPaymentMethodByStripePaymentMethodService: FindPaymentMethodByStripePaymentMethodService,
    private readonly cancelSubscriptionContractService: CancelSubscriptionContractService
  ) {}

  async execute(data: WebhookStripeCheckoutSessionDTO) {
    const stripeCheckoutSession =
      await this.findStripeCheckoutSessionByIdService.execute(
        data.stripeCheckoutSession,
        data.stripeAccount
      );
    const subscriptionContract =
      await this.findPaymentMethodByStripePaymentMethodService.execute(
        stripeCheckoutSession?.id
      );

    await this.cancelSubscriptionContractService.execute({
      subscriptionContract: subscriptionContract.id,
      app: subscriptionContract.app,
      updatedBy: subscriptionContract.updatedBy
    });

    return HttpStatus.OK;
  }
}
