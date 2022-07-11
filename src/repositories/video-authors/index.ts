import { CountVideoAuthorsRepository } from './count-video-authors';
import { CreateVideoAuthorRepository } from './create-video-author';
import { ExistsVideoAuthorsRepository } from './exists-video-authors';
import { FindAllVideoAuthorsRepository } from './find-all-video-authors';
import { FindVideoAuthorByIdRepository } from './find-video-author-by-id';
import { RemoveVideoAuthorRepository } from './remove-video-author';
import { UpdateVideoAuthorRepository } from './update-video-author';

export const VideoAuthorsRepositories = [
  CountVideoAuthorsRepository,
  CreateVideoAuthorRepository,
  ExistsVideoAuthorsRepository,
  FindVideoAuthorByIdRepository,
  FindAllVideoAuthorsRepository,
  RemoveVideoAuthorRepository,
  UpdateVideoAuthorRepository
];
