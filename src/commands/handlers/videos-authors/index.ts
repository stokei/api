import { CreateVideosAuthorCommandHandler } from './create-videos-author';
import { RemoveVideosAuthorCommandHandler } from './remove-videos-author';
import { UpdateVideosAuthorCommandHandler } from './update-videos-author';

export const VideosAuthorCommandHandlers = [
  CreateVideosAuthorCommandHandler,
  RemoveVideosAuthorCommandHandler,
  UpdateVideosAuthorCommandHandler
];
