import { ActivateVideoCommandHandler } from './activate-video';
import { CreateVideoCommandHandler } from './create-video';
import { RemoveVideoCommandHandler } from './remove-video';
import { UpdateVideoCommandHandler } from './update-video';

export const VideoCommandHandlers = [
  CreateVideoCommandHandler,
  RemoveVideoCommandHandler,
  UpdateVideoCommandHandler,
  ActivateVideoCommandHandler
];
