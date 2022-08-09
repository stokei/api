import { VideoAppResolver } from './app';
import { VideoCreatedByResolver } from './created-by';
import { VideoReferenceResolver } from './reference';
import { VideoUpdatedByResolver } from './updated-by';

export const VideosFieldsResolvers = [
  VideoReferenceResolver,
  VideoAppResolver,
  VideoCreatedByResolver,
  VideoUpdatedByResolver
];
