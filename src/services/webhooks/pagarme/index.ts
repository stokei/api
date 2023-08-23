import { WebhookPagarmeOrderCancelService } from './pagarme-order-cancel';
import { WebhookPagarmeOrderPaidService } from './pagarme-order-paid';
import { WebhookPagarmeService } from './webhook';

export const WebhookPagarmeServices = [
  WebhookPagarmeOrderPaidService,
  WebhookPagarmeOrderCancelService,
  WebhookPagarmeService
];
