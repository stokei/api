import { ICommand } from '@nestjs/cqrs';

import { RemovePageDependenciesDTO } from '@/dtos/pages/remove-page-dependencies.dto';
import { PageModel } from '@/models/page.model';

export class RemovePageDependenciesCommand
  implements ICommand, RemovePageDependenciesDTO
{
  page: PageModel;
  app: string;
  removedBy: string;

  constructor(data: RemovePageDependenciesDTO) {
    this.page = data.page;
    this.app = data.app;
    this.removedBy = data.removedBy;
  }
}
