import { WebhookMercadopagoOrderCancelService } from './mercadopago-order-cancel';
import { WebhookMercadopagoOrderPaidService } from './mercadopago-order-paid';
import { WebhookMercadopagoService } from './webhook';

export const WebhookMercadopagoServices = [
  WebhookMercadopagoService,
  WebhookMercadopagoOrderCancelService,
  WebhookMercadopagoOrderPaidService
];
