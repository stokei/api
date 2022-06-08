import { CountPagesRepository } from './count-pages';
import { CreatePageRepository } from './create-page';
import { ExistsPagesRepository } from './exists-pages';
import { FindPageByIdRepository } from './find-page-by-id';
import { FindAllPagesRepository } from './find-all-pages';
import { RemovePageRepository } from './remove-page';
import { UpdatePageRepository } from './update-page';

export const PagesRepositories = [
  CountPagesRepository,
  CreatePageRepository,
  ExistsPagesRepository,
  FindPageByIdRepository,
  FindAllPagesRepository,
  RemovePageRepository,
  UpdatePageRepository
];
