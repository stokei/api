import { SiteModel } from '@/models/site.model';

export interface RemoveSiteDependenciesDTO {
  removedBy: string;
  app: string;
  site: SiteModel;
}
