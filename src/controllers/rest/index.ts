import { ComponentsControllers } from './components';
import { HealthControllers } from './health';
import { PaymentGatewaysControllers } from './payment-gateways';
import { UploadsControllers } from './uploads';
import { VersionsControllers } from './versions';
import { WebhooksControllers } from './webhooks';

export const RestControllers = [
  ...ComponentsControllers,
  ...UploadsControllers,
  ...WebhooksControllers,
  ...HealthControllers,
  ...VersionsControllers,
  ...PaymentGatewaysControllers
];
