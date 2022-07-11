import { CreateVideoAuthorService } from './create-video-author';
import { FindAllVideoAuthorsService } from './find-all-video-authors';
import { FindVideoAuthorByIdService } from './find-video-author-by-id';
import { RemoveVideoAuthorService } from './remove-video-author';
import { UpdateVideoAuthorService } from './update-video-author';

export const VideoAuthorServices = [
  CreateVideoAuthorService,
  RemoveVideoAuthorService,
  UpdateVideoAuthorService,
  FindVideoAuthorByIdService,
  FindAllVideoAuthorsService
];
