import { CreateVideoAuthorResolver } from './create-video-author';
import { RemoveVideoAuthorResolver } from './remove-video-author';

export const VideoAuthorsMutations = [
  CreateVideoAuthorResolver,
  RemoveVideoAuthorResolver
];
