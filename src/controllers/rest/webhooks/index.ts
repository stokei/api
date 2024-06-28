import { WebhookMercadopagoController } from './mercadopago';
import { WebhookPagarmeController } from './pagarme';
import { WebhookStripeController } from './stripe';
import { WebhookVideosController } from './videos';

export const WebhooksControllers = [
  WebhookVideosController,
  WebhookPagarmeController,
  WebhookMercadopagoController,
  WebhookStripeController
];
