import { CountVideosMaterialsRepository } from './count-videos-materials';
import { CreateVideosMaterialRepository } from './create-videos-material';
import { ExistsVideosMaterialsRepository } from './exists-videos-materials';
import { FindVideosMaterialByIdRepository } from './find-videos-material-by-id';
import { FindAllVideosMaterialsRepository } from './find-all-videos-materials';
import { RemoveVideosMaterialRepository } from './remove-videos-material';
import { UpdateVideosMaterialRepository } from './update-videos-material';

export const VideosMaterialsRepositories = [
  CountVideosMaterialsRepository,
  CreateVideosMaterialRepository,
  ExistsVideosMaterialsRepository,
  FindVideosMaterialByIdRepository,
  FindAllVideosMaterialsRepository,
  RemoveVideosMaterialRepository,
  UpdateVideosMaterialRepository
];
