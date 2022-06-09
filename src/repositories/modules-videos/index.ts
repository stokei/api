import { CountModulesVideosRepository } from './count-modules-videos';
import { CreateModulesVideoRepository } from './create-modules-video';
import { ExistsModulesVideosRepository } from './exists-modules-videos';
import { FindAllModulesVideosRepository } from './find-all-modules-videos';
import { FindModulesVideoByIdRepository } from './find-modules-video-by-id';
import { RemoveModulesVideoRepository } from './remove-modules-video';
import { UpdateModulesVideoRepository } from './update-modules-video';

export const ModulesVideosRepositories = [
  CountModulesVideosRepository,
  CreateModulesVideoRepository,
  ExistsModulesVideosRepository,
  FindModulesVideoByIdRepository,
  FindAllModulesVideosRepository,
  RemoveModulesVideoRepository,
  UpdateModulesVideoRepository
];
