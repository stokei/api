import { HealthControllers } from './health';
import { UploadsControllers } from './uploads';
import { WebhooksControllers } from './webhooks';

export const RestControllers = [
  ...UploadsControllers,
  ...WebhooksControllers,
  ...HealthControllers
];
