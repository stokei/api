import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

import { ProjectStatus } from '@/enums/project-status.enum';

export interface WhereDataFindAllProjectsDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
  description?: IWhereDataSearch<string>;
  status?: IWhereData<ProjectStatus>;
  plan?: IWhereData<string>;
  currency?: IWhereData<string>;
  active?: IWhereData<boolean>;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysWhereDataFindAllProjectsDTO =
  keyof WhereDataFindAllProjectsDTO;

export interface OrderByDataFindAllProjectsDTO {
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
export type IKeysOrderByDataFindAllProjectsDTO =
  keyof OrderByDataFindAllProjectsDTO;

export type FindAllProjectsDTO = IBaseFindManyDTO<
  WhereDataFindAllProjectsDTO,
  OrderByDataFindAllProjectsDTO
>;
