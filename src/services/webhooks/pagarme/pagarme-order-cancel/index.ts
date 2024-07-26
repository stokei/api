import { HttpStatus, Injectable } from '@nestjs/common';
import { IBaseService } from '@stokei/nestjs';

import { WebhookPagarmeOrderCancelDTO } from '@/dtos/webhooks/webhook-pagarme-order-cancel.dto';
import { PaymentNotFoundException } from '@/errors';
import { FindPagarmeOrderByIdService } from '@/services/pagarme/find-pagarme-order-by-id';
import { ChangePaymentToPaymentErrorService } from '@/services/payments/change-payment-to-payment-error';
import { FindPaymentByIdService } from '@/services/payments/find-payment-by-id';

@Injectable()
export class WebhookPagarmeOrderCancelService
  implements IBaseService<WebhookPagarmeOrderCancelDTO, Promise<HttpStatus>>
{
  constructor(
    private readonly findPagarmeOrderByIdService: FindPagarmeOrderByIdService,
    private readonly findPaymentByIdService: FindPaymentByIdService,
    private readonly changePaymentToPaymentErrorService: ChangePaymentToPaymentErrorService
  ) {}

  async execute(data: WebhookPagarmeOrderCancelDTO) {
    // isso aqui não precisa, pois no data ja vem o code
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

    await this.changePaymentToPaymentErrorService.execute({
      payment: payment.id,
      updatedBy: payment.createdBy
    });

    return HttpStatus.OK;
  }
}
