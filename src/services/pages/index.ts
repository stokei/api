import { CreatePageService } from './create-page';
import { FindAllPagesService } from './find-all-pages';
import { FindPageByIdService } from './find-page-by-id';
import { FindPageBySlugAndParentService } from './find-page-by-slug-and-parent';
import { RemovePageService } from './remove-page';
import { UpdatePageService } from './update-page';

export const PageServices = [
  CreatePageService,
  RemovePageService,
  UpdatePageService,
  FindPageByIdService,
  FindAllPagesService,
  FindPageBySlugAndParentService
];
