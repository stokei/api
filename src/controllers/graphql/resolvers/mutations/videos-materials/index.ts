import { CreateVideosMaterialResolver } from './create-videos-material';
import { RemoveVideosMaterialResolver } from './remove-videos-material';
import { UpdateVideosMaterialResolver } from './update-videos-material';

export const VideosMaterialsMutations = [
  CreateVideosMaterialResolver,
  RemoveVideosMaterialResolver,
  UpdateVideosMaterialResolver
];
