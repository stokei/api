import { IQuery } from '@nestjs/cqrs';

import { FindPluginByTypeDTO } from '@/dtos/plugins/find-plugin-by-type.dto';
import { PluginType } from '@/enums/plugin-type.enum';

export class FindPluginByTypeQuery implements IQuery, FindPluginByTypeDTO {
  app: string;
  parent: string;
  type: PluginType;

  constructor(data: FindPluginByTypeDTO) {
    this.app = data.app;
    this.parent = data.parent;
    this.type = data.type;
  }
}
