import { VideoAppResolver } from './app';
import { VideoCreatedByResolver } from './created-by';
import { VideoFileResolver } from './file';
import { VideoReferenceResolver } from './reference';
import { VideoUpdatedByResolver } from './updated-by';

export const VideosFieldsResolvers = [
  VideoReferenceResolver,
  VideoAppResolver,
  VideoCreatedByResolver,
  VideoUpdatedByResolver,
  VideoFileResolver
];
