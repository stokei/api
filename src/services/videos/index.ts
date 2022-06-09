import { CreateVideoService } from './create-video';
import { FindAllVideosService } from './find-all-videos';
import { FindVideoByIdService } from './find-video-by-id';
import { RemoveVideoService } from './remove-video';
import { UpdateVideoService } from './update-video';

export const VideoServices = [
  CreateVideoService,
  RemoveVideoService,
  UpdateVideoService,
  FindVideoByIdService,
  FindAllVideosService
];
