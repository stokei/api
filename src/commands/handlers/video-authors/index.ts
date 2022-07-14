import { CreateVideoAuthorCommandHandler } from './create-video-author';
import { RemoveVideoAuthorCommandHandler } from './remove-video-author';

export const VideoAuthorCommandHandlers = [
  CreateVideoAuthorCommandHandler,
  RemoveVideoAuthorCommandHandler
];
