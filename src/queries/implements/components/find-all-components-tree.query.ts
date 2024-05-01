import { IQuery } from '@nestjs/cqrs';

import { FindAllComponentsTreeDTO } from '@/dtos/components/find-all-components-tree.dto';

export class FindAllComponentsTreeQuery
  implements IQuery, FindAllComponentsTreeDTO
{
  app: string;
  parent: string;

  constructor(data: FindAllComponentsTreeDTO) {
    this.app = data.app;
    this.parent = data.parent;
  }
}
