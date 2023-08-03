import { HttpStatus, Injectable } from '@nestjs/common';
import { IBaseService } from '@stokei/nestjs';

import { WebhookPagarmeOrderPaidDTO } from '@/dtos/webhooks/webhook-pagarme-order-paid.dto';
import { SubscriptionContractNotFoundException } from '@/errors';
import { FindPagarmeOrderByIdService } from '@/services/pagarme/find-pagarme-order-by-id';
import { ActivateSubscriptionContractService } from '@/services/subscription-contracts/activate-subscription-contract';
import { FindSubscriptionContractByIdService } from '@/services/subscription-contracts/find-subscription-contract-by-id';

@Injectable()
export class WebhookPagarmeOrderPaidService
  implements IBaseService<WebhookPagarmeOrderPaidDTO, Promise<HttpStatus>>
{
  constructor(
    private readonly findPagarmeOrderByIdService: FindPagarmeOrderByIdService,
    private readonly findSubscriptionContractByIdService: FindSubscriptionContractByIdService,
    private readonly activateSubscriptionContractService: ActivateSubscriptionContractService
  ) {}

  async execute(data: WebhookPagarmeOrderPaidDTO) {
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

    await this.activateSubscriptionContractService.execute({
      subscriptionContract: subscriptionContract.id,
      app: subscriptionContract.app,
      updatedBy: subscriptionContract.updatedBy
    });

    return HttpStatus.OK;
  }
}
