import { IQuery } from '@nestjs/cqrs';

import { FindAllComponentsWithComponentsChildrenDTO } from '@/dtos/components/find-all-components-with-components-children.dto';

export class FindAllComponentsWithComponentsChildrenQuery
  implements IQuery, FindAllComponentsWithComponentsChildrenDTO
{
  app: string;
  parent: string;

  constructor(data: FindAllComponentsWithComponentsChildrenDTO) {
    this.app = data.app;
    this.parent = data.parent;
  }
}
