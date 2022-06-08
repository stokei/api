import { CountVideosAuthorsRepository } from './count-videos-authors';
import { CreateVideosAuthorRepository } from './create-videos-author';
import { ExistsVideosAuthorsRepository } from './exists-videos-authors';
import { FindVideosAuthorByIdRepository } from './find-videos-author-by-id';
import { FindAllVideosAuthorsRepository } from './find-all-videos-authors';
import { RemoveVideosAuthorRepository } from './remove-videos-author';
import { UpdateVideosAuthorRepository } from './update-videos-author';

export const VideosAuthorsRepositories = [
  CountVideosAuthorsRepository,
  CreateVideosAuthorRepository,
  ExistsVideosAuthorsRepository,
  FindVideosAuthorByIdRepository,
  FindAllVideosAuthorsRepository,
  RemoveVideosAuthorRepository,
  UpdateVideosAuthorRepository
];
