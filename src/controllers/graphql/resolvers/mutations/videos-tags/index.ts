import { CreateVideosTagResolver } from './create-videos-tag';
import { RemoveVideosTagResolver } from './remove-videos-tag';
import { UpdateVideosTagResolver } from './update-videos-tag';

export const VideosTagsMutations = [
  CreateVideosTagResolver,
  RemoveVideosTagResolver,
  UpdateVideosTagResolver
];
