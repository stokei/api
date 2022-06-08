import { FindTagByIdService } from './find-tag-by-id';
import { FindAllTagsService } from './find-all-tags';
import { CreateTagService } from './create-tag';
import { RemoveTagService } from './remove-tag';
import { UpdateTagService } from './update-tag';

export const TagServices = [
  CreateTagService,
  RemoveTagService,
  UpdateTagService,
  FindTagByIdService,
  FindAllTagsService
];
