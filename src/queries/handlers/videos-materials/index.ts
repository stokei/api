import { FindAllVideosMaterialsQueryHandler } from './find-all-videos-materials';
import { FindVideosMaterialByIdQueryHandler } from './find-videos-material-by-id';

export const VideosMaterialQueriesHandlers = [
  FindVideosMaterialByIdQueryHandler,
  FindAllVideosMaterialsQueryHandler
];
