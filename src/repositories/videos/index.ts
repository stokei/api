import { CountVideosRepository } from './count-videos';
import { CreateVideoRepository } from './create-video';
import { ExistsVideosRepository } from './exists-videos';
import { FindAllVideosRepository } from './find-all-videos';
import { FindVideoByIdRepository } from './find-video-by-id';
import { RemoveVideoRepository } from './remove-video';
import { UpdateVideoRepository } from './update-video';

export const VideosRepositories = [
  CountVideosRepository,
  CreateVideoRepository,
  ExistsVideosRepository,
  FindVideoByIdRepository,
  FindAllVideosRepository,
  RemoveVideoRepository,
  UpdateVideoRepository
];
