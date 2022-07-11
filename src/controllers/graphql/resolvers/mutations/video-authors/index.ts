import { CreateVideoAuthorResolver } from './create-video-author';
import { RemoveVideoAuthorResolver } from './remove-video-author';
import { UpdateVideoAuthorResolver } from './update-video-author';

export const VideoAuthorsMutations = [
  CreateVideoAuthorResolver,
  RemoveVideoAuthorResolver,
  UpdateVideoAuthorResolver
];
