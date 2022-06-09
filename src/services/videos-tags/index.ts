import { CreateVideosTagService } from './create-videos-tag';
import { FindAllVideosTagsService } from './find-all-videos-tags';
import { FindVideosTagByIdService } from './find-videos-tag-by-id';
import { RemoveVideosTagService } from './remove-videos-tag';
import { UpdateVideosTagService } from './update-videos-tag';

export const VideosTagServices = [
  CreateVideosTagService,
  RemoveVideosTagService,
  UpdateVideosTagService,
  FindVideosTagByIdService,
  FindAllVideosTagsService
];
