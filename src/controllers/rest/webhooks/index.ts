import { WebhookPagarmeController } from './pagarme';
import { WebhookStripeController } from './stripe';
import { WebhookVideosController } from './videos';

export const WebhooksControllers = [
  WebhookStripeController,
  WebhookVideosController,
  WebhookPagarmeController
];
