import { CreateVideoCommandHandler } from './create-video';
import { RemoveVideoCommandHandler } from './remove-video';
import { StartVideoEncodingCommandHandler } from './start-video-encoding';
import { UpdateVideoCommandHandler } from './update-video';

export const VideoCommandHandlers = [
  CreateVideoCommandHandler,
  RemoveVideoCommandHandler,
  UpdateVideoCommandHandler,
  StartVideoEncodingCommandHandler
];
