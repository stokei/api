import { VideoAppResolver } from './app';
import { VideoReferenceResolver } from './reference';

export const VideosFieldsResolvers = [VideoReferenceResolver, VideoAppResolver];
