import { ICommand } from '@nestjs/cqrs';

import { RemoveSiteDependenciesDTO } from '@/dtos/sites/remove-site-dependencies.dto';
import { SiteModel } from '@/models/site.model';

export class RemoveSiteDependenciesCommand
  implements ICommand, RemoveSiteDependenciesDTO
{
  site: SiteModel;
  app: string;
  removedBy: string;

  constructor(data: RemoveSiteDependenciesDTO) {
    this.site = data.site;
    this.app = data.app;
    this.removedBy = data.removedBy;
  }
}
