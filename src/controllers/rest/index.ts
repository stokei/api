import { UploadsControllers } from './uploads';
import { WebhooksControllers } from './webhooks';

export const RestControllers = [...UploadsControllers, ...WebhooksControllers];
