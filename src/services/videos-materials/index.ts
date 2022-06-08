import { FindVideosMaterialByIdService } from './find-videos-material-by-id';
import { FindAllVideosMaterialsService } from './find-all-videos-materials';
import { CreateVideosMaterialService } from './create-videos-material';
import { RemoveVideosMaterialService } from './remove-videos-material';
import { UpdateVideosMaterialService } from './update-videos-material';

export const VideosMaterialServices = [
  CreateVideosMaterialService,
  RemoveVideosMaterialService,
  UpdateVideosMaterialService,
  FindVideosMaterialByIdService,
  FindAllVideosMaterialsService
];
