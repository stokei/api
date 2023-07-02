import { CreateVideoViewRepository } from './create-video-view';
import { FindVideoViewByIdRepository } from './find-video-view-by-id';
import { IncrementVideoViewRepository } from './increment-video-view';

export const VideoViewsRepositories = [
  CreateVideoViewRepository,
  IncrementVideoViewRepository,
  FindVideoViewByIdRepository
];
