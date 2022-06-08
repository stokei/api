import { FindVideosSubtitleByIdService } from './find-videos-subtitle-by-id';
import { FindAllVideosSubtitlesService } from './find-all-videos-subtitles';
import { CreateVideosSubtitleService } from './create-videos-subtitle';
import { RemoveVideosSubtitleService } from './remove-videos-subtitle';
import { UpdateVideosSubtitleService } from './update-videos-subtitle';

export const VideosSubtitleServices = [
  CreateVideosSubtitleService,
  RemoveVideosSubtitleService,
  UpdateVideosSubtitleService,
  FindVideosSubtitleByIdService,
  FindAllVideosSubtitlesService
];
