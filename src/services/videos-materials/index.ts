import { CreateVideosMaterialService } from './create-videos-material';
import { FindAllVideosMaterialsService } from './find-all-videos-materials';
import { FindVideosMaterialByIdService } from './find-videos-material-by-id';
import { RemoveVideosMaterialService } from './remove-videos-material';
import { UpdateVideosMaterialService } from './update-videos-material';

export const VideosMaterialServices = [
  CreateVideosMaterialService,
  RemoveVideosMaterialService,
  UpdateVideosMaterialService,
  FindVideosMaterialByIdService,
  FindAllVideosMaterialsService
];
