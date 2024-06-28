import { HttpStatus, Injectable } from '@nestjs/common';
import { IBaseService } from '@stokei/nestjs';

import { WebhookStripePaymentFailedDTO } from '@/dtos/webhooks/webhook-stripe-payment-failed.dto';
import { PaymentNotFoundException } from '@/errors';
import { ChangePaymentToPaymentErrorService } from '@/services/payments/change-payment-to-payment-error';
import { FindPaymentByIdService } from '@/services/payments/find-payment-by-id';

@Injectable()
export class WebhookStripePaymentFailedService
  implements IBaseService<WebhookStripePaymentFailedDTO, Promise<HttpStatus>>
{
  constructor(
    private readonly findPaymentByIdService: FindPaymentByIdService,
    private readonly changePaymentToPaymentErrorService: ChangePaymentToPaymentErrorService
  ) {}

  async execute(data: WebhookStripePaymentFailedDTO) {
    const stripePaymentIntent = data.stripePaymentIntent;
    const payment = await this.findPaymentByIdService.execute(
      stripePaymentIntent?.metadata?.payment
    );
    if (!payment) {
      throw new PaymentNotFoundException();
    }

    await this.changePaymentToPaymentErrorService.execute({
      payment: payment.id,
      updatedBy: payment.createdBy
    });

    return HttpStatus.OK;
  }
}
