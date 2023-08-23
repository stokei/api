import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { hiddenPrivateDataFromObject, IBaseService } from '@stokei/nestjs';

import { DEFAULT_PRIVATE_DATA } from '@/constants/default-private-data';
import { WebhookPagarmeDTO } from '@/dtos/webhooks/webhook-pagarme.dto';
import { WebhookPagarmeOrderCancelService } from '@/services/webhooks/pagarme/pagarme-order-cancel';
import { WebhookPagarmeOrderPaidService } from '@/services/webhooks/pagarme/pagarme-order-paid';

@Injectable()
export class WebhookPagarmeService implements IBaseService<WebhookPagarmeDTO> {
  constructor(
    private readonly webhookPagarmeOrderCancelService: WebhookPagarmeOrderCancelService,
    private readonly webhookPagarmeOrderPaidService: WebhookPagarmeOrderPaidService
  ) {}

  async execute({ body }: WebhookPagarmeDTO) {
    const logger = new Logger(WebhookPagarmeService.name);

    const eventObject: any = body?.data;
    const eventType = body?.type;

    try {
      switch (eventType) {
        case 'order.paid':
          return await this.webhookPagarmeOrderPaidService.execute({
            order: eventObject.id
          });
        case 'order.canceled':
        case 'order.payment_failed':
        case 'order.closed':
          return await this.webhookPagarmeOrderCancelService.execute({
            order: eventObject.id
          });
        default:
          return { status: HttpStatus.OK };
      }
    } catch (error) {
      logger.error(
        hiddenPrivateDataFromObject(
          {
            error: error?.message,
            eventType
          },
          DEFAULT_PRIVATE_DATA
        )
      );
      return { status: HttpStatus.INTERNAL_SERVER_ERROR };
    }
  }
}
