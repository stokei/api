import { CreateVideosSubtitleResolver } from './create-videos-subtitle';
import { RemoveVideosSubtitleResolver } from './remove-videos-subtitle';
import { UpdateVideosSubtitleResolver } from './update-videos-subtitle';

export const VideosSubtitlesMutations = [
  CreateVideosSubtitleResolver,
  RemoveVideosSubtitleResolver,
  UpdateVideosSubtitleResolver
];
