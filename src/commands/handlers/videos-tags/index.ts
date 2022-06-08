import { CreateVideosTagCommandHandler } from './create-videos-tag';
import { RemoveVideosTagCommandHandler } from './remove-videos-tag';
import { UpdateVideosTagCommandHandler } from './update-videos-tag';

export const VideosTagCommandHandlers = [
  CreateVideosTagCommandHandler,
  RemoveVideosTagCommandHandler,
  UpdateVideosTagCommandHandler
];
