import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { hiddenPrivateDataFromObject, IBaseService } from '@stokei/nestjs';

import { defaultAccountId } from '@/constants/default-account-id';
import { DEFAULT_PRIVATE_DATA } from '@/constants/default-private-data';
import { WebhookMercadopagoDTO } from '@/dtos/webhooks/webhook-mercadopago.dto';
import { PaymentGatewayType } from '@/enums/payment-gateway-type.enum';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';
import { ChangePaymentToPaidService } from '@/services/payments/change-payment-to-paid';
import { ChangePaymentToPaymentErrorService } from '@/services/payments/change-payment-to-payment-error';
import { FindPaymentByPaymentProcessorService } from '@/services/payments-gateways/factories/find-payment';

@Injectable()
export class WebhookMercadopagoService
  implements IBaseService<WebhookMercadopagoDTO>
{
  constructor(
    private readonly findPaymentByPaymentProcessorService: FindPaymentByPaymentProcessorService,
    private readonly changePaymentToPaymentErrorService: ChangePaymentToPaymentErrorService,
    private readonly changePaymentToPaidService: ChangePaymentToPaidService,
    private readonly findAppByIdService: FindAppByIdService
  ) {}

  async execute({ body, queryParams }: WebhookMercadopagoDTO) {
    const logger = new Logger(WebhookMercadopagoService.name);

    const eventObject: any = body?.data;
    const eventType = body?.type;

    try {
      switch (eventType) {
        case 'payment':
          const app = await this.findAppByIdService.execute(queryParams?.appId);
          const payment =
            await this.findPaymentByPaymentProcessorService.execute({
              id: eventObject?.id,
              app,
              paymentGatewayType: PaymentGatewayType.MERCADOPAGO
            });

          if (payment.status === 'approved') {
            await this.changePaymentToPaidService.execute({
              payment: payment.referenceId,
              updatedBy: defaultAccountId
            });
          } else if (
            ['rejected', 'cancelled', 'refunded', 'charged_back'].includes(
              payment.status
            )
          ) {
            await this.changePaymentToPaymentErrorService.execute({
              payment: payment.referenceId,
              updatedBy: defaultAccountId
            });
          }
          return { status: HttpStatus.OK };
        default:
          return { status: HttpStatus.OK };
      }
    } catch (error) {
      logger.error(
        JSON.stringify(
          hiddenPrivateDataFromObject(
            {
              error: error?.message,
              eventType
            },
            DEFAULT_PRIVATE_DATA
          )
        )
      );
      return { status: HttpStatus.INTERNAL_SERVER_ERROR };
    }
  }
}
