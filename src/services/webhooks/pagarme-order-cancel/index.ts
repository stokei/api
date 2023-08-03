import { HttpStatus, Injectable } from '@nestjs/common';
import { IBaseService } from '@stokei/nestjs';

import { WebhookPagarmeOrderCancelDTO } from '@/dtos/webhooks/webhook-pagarme-order-cancel.dto';
import { SubscriptionContractNotFoundException } from '@/errors';
import { FindPagarmeOrderByIdService } from '@/services/pagarme/find-pagarme-order-by-id';
import { CancelSubscriptionContractService } from '@/services/subscription-contracts/cancel-subscription-contract';
import { FindSubscriptionContractByIdService } from '@/services/subscription-contracts/find-subscription-contract-by-id';

@Injectable()
export class WebhookPagarmeOrderCancelService
  implements IBaseService<WebhookPagarmeOrderCancelDTO, Promise<HttpStatus>>
{
  constructor(
    private readonly findPagarmeOrderByIdService: FindPagarmeOrderByIdService,
    private readonly findSubscriptionContractByIdService: FindSubscriptionContractByIdService,
    private readonly cancelSubscriptionContractService: CancelSubscriptionContractService
  ) {}

  async execute(data: WebhookPagarmeOrderCancelDTO) {
    const pagarmeOrder = await this.findPagarmeOrderByIdService.execute(
      data.order
    );
    if (!pagarmeOrder?.code) {
      throw new SubscriptionContractNotFoundException();
    }
    const subscriptionContract =
      await this.findSubscriptionContractByIdService.execute(pagarmeOrder.code);
    if (!pagarmeOrder?.code) {
      throw new SubscriptionContractNotFoundException();
    }

    await this.cancelSubscriptionContractService.execute({
      subscriptionContract: subscriptionContract.id,
      app: subscriptionContract.app,
      updatedBy: subscriptionContract.updatedBy
    });

    return HttpStatus.OK;
  }
}
