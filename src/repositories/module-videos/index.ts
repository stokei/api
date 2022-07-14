import { CountModuleVideosRepository } from './count-module-videos';
import { CreateModuleVideoRepository } from './create-module-video';
import { ExistsModuleVideosRepository } from './exists-module-videos';
import { FindAllModuleVideosRepository } from './find-all-module-videos';
import { FindModuleVideoByIdRepository } from './find-module-video-by-id';
import { RemoveModuleVideoRepository } from './remove-module-video';

export const ModuleVideosRepositories = [
  CountModuleVideosRepository,
  CreateModuleVideoRepository,
  ExistsModuleVideosRepository,
  FindModuleVideoByIdRepository,
  FindAllModuleVideosRepository,
  RemoveModuleVideoRepository
];
