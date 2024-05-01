import { CountPagesRepository } from './count-pages';
import { CreatePageRepository } from './create-page';
import { FindAllPagesRepository } from './find-all-pages';
import { FindPageByIdRepository } from './find-page-by-id';
import { FindPageBySlugAndParentRepository } from './find-page-by-slug-and-parent';
import { RemovePageRepository } from './remove-page';
import { UpdatePageRepository } from './update-page';

export const PagesRepositories = [
  CountPagesRepository,
  CreatePageRepository,
  FindPageByIdRepository,
  FindAllPagesRepository,
  RemovePageRepository,
  UpdatePageRepository,
  FindPageBySlugAndParentRepository
];
