import { CreateLoginPageService } from './create-login-page';
import { CreatePageService } from './create-page';
import { CreateSignUpPageService } from './create-signup-page';
import { FindAllPagesService } from './find-all-pages';
import { FindPageByIdService } from './find-page-by-id';
import { FindPageBySlugAndParentService } from './find-page-by-slug-and-parent';
import { RemovePageService } from './remove-page';
import { UpdatePageService } from './update-page';

export const PageServices = [
  CreatePageService,
  CreateLoginPageService,
  CreateSignUpPageService,
  RemovePageService,
  UpdatePageService,
  FindPageByIdService,
  FindAllPagesService,
  FindPageBySlugAndParentService
];
