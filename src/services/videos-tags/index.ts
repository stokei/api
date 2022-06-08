import { FindVideosTagByIdService } from './find-videos-tag-by-id';
import { FindAllVideosTagsService } from './find-all-videos-tags';
import { CreateVideosTagService } from './create-videos-tag';
import { RemoveVideosTagService } from './remove-videos-tag';
import { UpdateVideosTagService } from './update-videos-tag';

export const VideosTagServices = [
  CreateVideosTagService,
  RemoveVideosTagService,
  UpdateVideosTagService,
  FindVideosTagByIdService,
  FindAllVideosTagsService
];
