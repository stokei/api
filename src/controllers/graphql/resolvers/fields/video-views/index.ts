import { VideoViewAppResolver } from './app';
import { VideoViewCreatedByResolver } from './created-by';
import { VideoViewUpdatedByResolver } from './updated-by';
import { VideoViewViewerResolver } from './viewer';

export const VideoViewsFieldsResolvers = [
  VideoViewAppResolver,
  VideoViewCreatedByResolver,
  VideoViewUpdatedByResolver,
  VideoViewViewerResolver
];
