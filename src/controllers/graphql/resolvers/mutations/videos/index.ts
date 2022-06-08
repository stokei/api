import { CreateVideoResolver } from './create-video';
import { RemoveVideoResolver } from './remove-video';
import { UpdateVideoResolver } from './update-video';

export const VideosMutations = [
  CreateVideoResolver,
  RemoveVideoResolver,
  UpdateVideoResolver
];
