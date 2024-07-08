import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

import { PluginType } from '@/enums/plugin-type.enum';

export interface WhereDataFindAllPluginsDTO {
  ids?: string[];
  app?: IWhereData;
  parent?: IWhereDataSearch;
  type?: PluginType;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysWhereDataFindAllPluginsDTO = keyof WhereDataFindAllPluginsDTO;

export interface OrderByDataFindAllPluginsDTO {
  type?: IOrderBy;
  updatedBy?: IOrderBy;
  createdBy?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllPluginsDTO =
  keyof OrderByDataFindAllPluginsDTO;

export type FindAllPluginsDTO = IBaseFindManyDTO<
  WhereDataFindAllPluginsDTO,
  OrderByDataFindAllPluginsDTO
>;
