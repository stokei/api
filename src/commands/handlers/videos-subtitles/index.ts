import { CreateVideosSubtitleCommandHandler } from './create-videos-subtitle';
import { RemoveVideosSubtitleCommandHandler } from './remove-videos-subtitle';
import { UpdateVideosSubtitleCommandHandler } from './update-videos-subtitle';

export const VideosSubtitleCommandHandlers = [
  CreateVideosSubtitleCommandHandler,
  RemoveVideosSubtitleCommandHandler,
  UpdateVideosSubtitleCommandHandler
];
