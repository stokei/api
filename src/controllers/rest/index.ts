import { ImagesControllers } from './images';
import { VideosControllers } from './videos';
import { WebhooksControllers } from './webhooks';

export const RestControllers = [
  ...ImagesControllers,
  ...VideosControllers,
  ...WebhooksControllers
];
