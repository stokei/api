import { CreateTagService } from './create-tag';
import { FindAllTagsService } from './find-all-tags';
import { FindTagByIdService } from './find-tag-by-id';
import { RemoveTagService } from './remove-tag';
import { UpdateTagService } from './update-tag';

export const TagServices = [
  CreateTagService,
  RemoveTagService,
  UpdateTagService,
  FindTagByIdService,
  FindAllTagsService
];
