import { FindAllModuleVideosQueryHandler } from './find-all-module-videos';
import { FindModuleVideoByIdQueryHandler } from './find-module-video-by-id';

export const ModuleVideoQueriesHandlers = [
  FindModuleVideoByIdQueryHandler,
  FindAllModuleVideosQueryHandler
];
