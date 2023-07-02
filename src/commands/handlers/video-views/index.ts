import { AddVideoViewToAppSubscriptionContractCommandHandler } from './add-video-view-to-app-subscription-contract';
import { CreateVideoViewCommandHandler } from './create-video-view';
import { IncrementVideoViewCommandHandler } from './increment-video-view';

export const VideoViewCommandHandlers = [
  CreateVideoViewCommandHandler,
  IncrementVideoViewCommandHandler,
  AddVideoViewToAppSubscriptionContractCommandHandler
];
