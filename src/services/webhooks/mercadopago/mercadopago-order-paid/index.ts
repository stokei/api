import { HttpStatus, Injectable } from '@nestjs/common';
import { IBaseService } from '@stokei/nestjs';

import { WebhookMercadopagoOrderPaidDTO } from '@/dtos/webhooks/webhook-mercadopago-order-paid.dto';
import { PaymentGatewayType } from '@/enums/payment-gateway-type.enum';
import { PaymentNotFoundException } from '@/errors';
import { ChangePaymentToPaidService } from '@/services/payments/change-payment-to-paid';
import { FindPaymentByIdService } from '@/services/payments/find-payment-by-id';
import { FindPaymentByPaymentProcessorService } from '@/services/payments-gateways/factories/find-payment';

@Injectable()
export class WebhookMercadopagoOrderPaidService
  implements IBaseService<WebhookMercadopagoOrderPaidDTO, Promise<HttpStatus>>
{
  constructor(
    private readonly findPaymentByPaymentProcessorService: FindPaymentByPaymentProcessorService,
    private readonly findPaymentByIdService: FindPaymentByIdService,
    private readonly changePaymentToPaidService: ChangePaymentToPaidService
  ) {}

  async execute(data: WebhookMercadopagoOrderPaidDTO) {
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

    await this.changePaymentToPaidService.execute({
      payment: payment.id,
      updatedBy: payment.createdBy
    });

    return HttpStatus.OK;
  }
}
