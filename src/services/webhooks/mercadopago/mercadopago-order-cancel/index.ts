import { HttpStatus, Injectable } from '@nestjs/common';
import { IBaseService } from '@stokei/nestjs';

import { WebhookMercadopagoOrderCancelDTO } from '@/dtos/webhooks/webhook-mercadopago-order-cancel.dto';
import { PaymentGatewayType } from '@/enums/payment-gateway-type.enum';
import { PaymentNotFoundException } from '@/errors';
import { ChangePaymentToPaymentErrorService } from '@/services/payments/change-payment-to-payment-error';
import { FindPaymentByIdService } from '@/services/payments/find-payment-by-id';
import { FindPaymentByPaymentProcessorService } from '@/services/payments-gateways/factories/find-payment';

@Injectable()
export class WebhookMercadopagoOrderCancelService
  implements
    IBaseService<WebhookMercadopagoOrderCancelDTO, Promise<HttpStatus>>
{
  constructor(
    private readonly findPaymentByPaymentProcessorService: FindPaymentByPaymentProcessorService,
    private readonly findPaymentByIdService: FindPaymentByIdService,
    private readonly changePaymentToPaymentErrorService: ChangePaymentToPaymentErrorService
  ) {}

  async execute(data: WebhookMercadopagoOrderCancelDTO) {
    const mercadopagoOrder =
      await this.findPaymentByPaymentProcessorService.execute({
        id: data.order,
        app: null,
        paymentGatewayType: PaymentGatewayType.MERCADOPAGO
      });
    if (!mercadopagoOrder?.referenceId) {
      throw new PaymentNotFoundException();
    }
    const payment = await this.findPaymentByIdService.execute(
      mercadopagoOrder.referenceId
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
