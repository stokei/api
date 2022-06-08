import { FindVideosAuthorByIdService } from './find-videos-author-by-id';
import { FindAllVideosAuthorsService } from './find-all-videos-authors';
import { CreateVideosAuthorService } from './create-videos-author';
import { RemoveVideosAuthorService } from './remove-videos-author';
import { UpdateVideosAuthorService } from './update-videos-author';

export const VideosAuthorServices = [
  CreateVideosAuthorService,
  RemoveVideosAuthorService,
  UpdateVideosAuthorService,
  FindVideosAuthorByIdService,
  FindAllVideosAuthorsService
];
