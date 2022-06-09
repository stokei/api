import { CountVideosSubtitlesRepository } from './count-videos-subtitles';
import { CreateVideosSubtitleRepository } from './create-videos-subtitle';
import { ExistsVideosSubtitlesRepository } from './exists-videos-subtitles';
import { FindAllVideosSubtitlesRepository } from './find-all-videos-subtitles';
import { FindVideosSubtitleByIdRepository } from './find-videos-subtitle-by-id';
import { RemoveVideosSubtitleRepository } from './remove-videos-subtitle';
import { UpdateVideosSubtitleRepository } from './update-videos-subtitle';

export const VideosSubtitlesRepositories = [
  CountVideosSubtitlesRepository,
  CreateVideosSubtitleRepository,
  ExistsVideosSubtitlesRepository,
  FindVideosSubtitleByIdRepository,
  FindAllVideosSubtitlesRepository,
  RemoveVideosSubtitleRepository,
  UpdateVideosSubtitleRepository
];
