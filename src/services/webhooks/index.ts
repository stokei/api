import { WebhookPagarmeServices } from './pagarme';
import { WebhookVideosServices } from './videos';

export const WebhookServices = [
  ...WebhookPagarmeServices,
  ...WebhookVideosServices
];
