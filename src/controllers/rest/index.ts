import { FilesControllers } from './files';
import { WebhooksControllers } from './webhooks';

export const RestControllers = [...FilesControllers, ...WebhooksControllers];
