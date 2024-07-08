import { HttpStatus, Injectable } from '@nestjs/common';
import { IBaseService } from '@stokei/nestjs';

import { WebhookStripePaymentSucceededDTO } from '@/dtos/webhooks/webhook-stripe-payment-succeeded.dto';
import { PaymentNotFoundException } from '@/errors';
import { ChangePaymentToPaidService } from '@/services/payments/change-payment-to-paid';
import { FindPaymentByIdService } from '@/services/payments/find-payment-by-id';

@Injectable()
export class WebhookStripePaymentSucceededService
  implements
    IBaseService<WebhookStripePaymentSucceededDTO, Promise<HttpStatus>>
{
  constructor(
    private readonly findPaymentByIdService: FindPaymentByIdService,
    private readonly changePaymentToPaidService: ChangePaymentToPaidService
  ) {}

  async execute(data: WebhookStripePaymentSucceededDTO) {
    const stripePaymentIntent = data.stripePaymentIntent;

    const payment = await this.findPaymentByIdService.execute(
      stripePaymentIntent?.metadata?.payment
    );
    if (!payment) {
      throw new PaymentNotFoundException();
    }

    await this.changePaymentToPaidService.execute({
      payment: payment.id,
      updatedBy: payment.createdBy
    });

    return HttpStatus.OK;
  }
}
