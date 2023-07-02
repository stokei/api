import { CreateVideoViewService } from './create-video-view';
import { FindVideoViewByIdService } from './find-video-view-by-id';
import { IncrementVideoViewService } from './increment-video-view';

export const VideoViewServices = [
  CreateVideoViewService,
  IncrementVideoViewService,
  FindVideoViewByIdService
];
