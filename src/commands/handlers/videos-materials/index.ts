import { CreateVideosMaterialCommandHandler } from './create-videos-material';
import { RemoveVideosMaterialCommandHandler } from './remove-videos-material';
import { UpdateVideosMaterialCommandHandler } from './update-videos-material';

export const VideosMaterialCommandHandlers = [
  CreateVideosMaterialCommandHandler,
  RemoveVideosMaterialCommandHandler,
  UpdateVideosMaterialCommandHandler
];
