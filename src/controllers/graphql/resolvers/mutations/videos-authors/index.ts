import { CreateVideosAuthorResolver } from './create-videos-author';
import { RemoveVideosAuthorResolver } from './remove-videos-author';
import { UpdateVideosAuthorResolver } from './update-videos-author';

export const VideosAuthorsMutations = [
  CreateVideosAuthorResolver,
  RemoveVideosAuthorResolver,
  UpdateVideosAuthorResolver
];
