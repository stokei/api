import { HealthControllers } from './health';
import { UploadsControllers } from './uploads';
import { VersionsControllers } from './versions';
import { WebhooksControllers } from './webhooks';

export const RestControllers = [
  ...UploadsControllers,
  ...WebhooksControllers,
  ...HealthControllers,
  ...VersionsControllers
];
