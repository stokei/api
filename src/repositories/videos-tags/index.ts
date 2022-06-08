import { CountVideosTagsRepository } from './count-videos-tags';
import { CreateVideosTagRepository } from './create-videos-tag';
import { ExistsVideosTagsRepository } from './exists-videos-tags';
import { FindVideosTagByIdRepository } from './find-videos-tag-by-id';
import { FindAllVideosTagsRepository } from './find-all-videos-tags';
import { RemoveVideosTagRepository } from './remove-videos-tag';
import { UpdateVideosTagRepository } from './update-videos-tag';

export const VideosTagsRepositories = [
  CountVideosTagsRepository,
  CreateVideosTagRepository,
  ExistsVideosTagsRepository,
  FindVideosTagByIdRepository,
  FindAllVideosTagsRepository,
  RemoveVideosTagRepository,
  UpdateVideosTagRepository
];
