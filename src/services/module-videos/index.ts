import { CreateModuleVideoService } from './create-module-video';
import { FindAllModuleVideosService } from './find-all-module-videos';
import { FindModuleVideoByIdService } from './find-module-video-by-id';
import { RemoveModuleVideoService } from './remove-module-video';
import { UpdateModuleVideoService } from './update-module-video';

export const ModuleVideoServices = [
  CreateModuleVideoService,
  RemoveModuleVideoService,
  UpdateModuleVideoService,
  FindModuleVideoByIdService,
  FindAllModuleVideosService
];
