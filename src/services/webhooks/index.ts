import { WebhookMercadopagoServices } from './mercadopago';
import { WebhookPagarmeServices } from './pagarme';
import { WebhookStripeServices } from './stripe';
import { WebhookVideosServices } from './videos';

export const WebhookServices = [
  ...WebhookStripeServices,
  ...WebhookPagarmeServices,
  ...WebhookVideosServices,
  ...WebhookMercadopagoServices
];
