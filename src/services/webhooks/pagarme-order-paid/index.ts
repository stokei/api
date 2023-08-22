import { HttpStatus, Injectable } from '@nestjs/common';
import { IBaseService } from '@stokei/nestjs';

import { WebhookPagarmeOrderPaidDTO } from '@/dtos/webhooks/webhook-pagarme-order-paid.dto';
import { PaymentNotFoundException } from '@/errors';
import { FindPagarmeOrderByIdService } from '@/services/pagarme/find-pagarme-order-by-id';
import { ChangePaymentToPaidService } from '@/services/payments/change-payment-to-paid';
import { FindPaymentByIdService } from '@/services/payments/find-payment-by-id';

@Injectable()
export class WebhookPagarmeOrderPaidService
  implements IBaseService<WebhookPagarmeOrderPaidDTO, Promise<HttpStatus>>
{
  constructor(
    private readonly findPagarmeOrderByIdService: FindPagarmeOrderByIdService,
    private readonly findPaymentByIdService: FindPaymentByIdService,
    private readonly changePaymentToPaidService: ChangePaymentToPaidService
  ) {}

  async execute(data: WebhookPagarmeOrderPaidDTO) {
    const pagarmeOrder = await this.findPagarmeOrderByIdService.execute(
      data.order
    );
    if (!pagarmeOrder?.code) {
      throw new PaymentNotFoundException();
    }
    const payment = await this.findPaymentByIdService.execute(
      pagarmeOrder.code
    );
    if (!pagarmeOrder?.code) {
      throw new PaymentNotFoundException();
    }

    await this.changePaymentToPaidService.execute({
      payment: payment.id,
      app: payment.app,
      updatedBy: payment.updatedBy
    });

    return HttpStatus.OK;
  }
}
