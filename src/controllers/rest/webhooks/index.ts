import { WebhookQencodeController } from './qencode';
import { WebhookStripeController } from './stripe';

export const WebhooksControllers = [
  WebhookStripeController,
  WebhookQencodeController
];
