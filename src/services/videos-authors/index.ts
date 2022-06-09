import { CreateVideosAuthorService } from './create-videos-author';
import { FindAllVideosAuthorsService } from './find-all-videos-authors';
import { FindVideosAuthorByIdService } from './find-videos-author-by-id';
import { RemoveVideosAuthorService } from './remove-videos-author';
import { UpdateVideosAuthorService } from './update-videos-author';

export const VideosAuthorServices = [
  CreateVideosAuthorService,
  RemoveVideosAuthorService,
  UpdateVideosAuthorService,
  FindVideosAuthorByIdService,
  FindAllVideosAuthorsService
];
