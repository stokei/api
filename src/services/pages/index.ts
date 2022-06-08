import { FindPageByIdService } from './find-page-by-id';
import { FindAllPagesService } from './find-all-pages';
import { CreatePageService } from './create-page';
import { RemovePageService } from './remove-page';
import { UpdatePageService } from './update-page';

export const PageServices = [
  CreatePageService,
  RemovePageService,
  UpdatePageService,
  FindPageByIdService,
  FindAllPagesService
];
