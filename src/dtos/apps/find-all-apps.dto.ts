import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

import { AppStatus } from '@/enums/app-status.enum';

export interface WhereDataFindAllAppsDTO {
  ids?: string[];
  app?: IWhereData;
  parent?: IWhereData;
  name?: IWhereDataSearch;
  description?: IWhereDataSearch<string>;
  status?: AppStatus;
  plan?: IWhereData<string>;
  currency?: IWhereData<string>;
  active?: IWhereData<boolean>;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysWhereDataFindAllAppsDTO = keyof WhereDataFindAllAppsDTO;

export interface OrderByDataFindAllAppsDTO {
  name?: IOrderBy;
  slug?: IOrderBy;
  status?: IOrderBy;
  plan?: IOrderBy;
  currency?: IOrderBy;
  active?: IOrderBy;
  blockedAt?: IOrderBy;
  activatedAt?: IOrderBy;
  deactivatedAt?: IOrderBy;
  updatedBy?: IOrderBy;
  createdBy?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllAppsDTO = keyof OrderByDataFindAllAppsDTO;

export type FindAllAppsDTO = IBaseFindManyDTO<
  WhereDataFindAllAppsDTO,
  OrderByDataFindAllAppsDTO
>;
