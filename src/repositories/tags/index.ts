import { CountTagsRepository } from './count-tags';
import { CreateTagRepository } from './create-tag';
import { ExistsTagsRepository } from './exists-tags';
import { FindAllTagsRepository } from './find-all-tags';
import { FindTagByIdRepository } from './find-tag-by-id';
import { RemoveTagRepository } from './remove-tag';
import { UpdateTagRepository } from './update-tag';

export const TagsRepositories = [
  CountTagsRepository,
  CreateTagRepository,
  ExistsTagsRepository,
  FindTagByIdRepository,
  FindAllTagsRepository,
  RemoveTagRepository,
  UpdateTagRepository
];
