import { CreateVideoAuthorCommandHandler } from './create-video-author';
import { RemoveVideoAuthorCommandHandler } from './remove-video-author';
import { UpdateVideoAuthorCommandHandler } from './update-video-author';

export const VideoAuthorCommandHandlers = [
  CreateVideoAuthorCommandHandler,
  RemoveVideoAuthorCommandHandler,
  UpdateVideoAuthorCommandHandler
];
