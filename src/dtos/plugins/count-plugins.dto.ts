import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

import { PluginType } from '@/enums/plugin-type.enum';

export interface CountPluginsWhereDTO {
  ids?: string[];
  app?: IWhereData;
  parent?: IWhereDataSearch;
  type?: PluginType;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysCountPluginsWhereDTO = keyof CountPluginsWhereDTO;

export type CountPluginsDTO = IBaseCountDTO<CountPluginsWhereDTO>;
