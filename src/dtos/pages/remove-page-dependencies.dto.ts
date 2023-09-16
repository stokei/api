import { PageModel } from '@/models/page.model';

export interface RemovePageDependenciesDTO {
  removedBy: string;
  app: string;
  page: PageModel;
}
