import { CreateModulesVideoService } from './create-modules-video';
import { FindAllModulesVideosService } from './find-all-modules-videos';
import { FindModulesVideoByIdService } from './find-modules-video-by-id';
import { RemoveModulesVideoService } from './remove-modules-video';
import { UpdateModulesVideoService } from './update-modules-video';

export const ModulesVideoServices = [
  CreateModulesVideoService,
  RemoveModulesVideoService,
  UpdateModulesVideoService,
  FindModulesVideoByIdService,
  FindAllModulesVideosService
];
