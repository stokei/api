import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

import { PlanType } from '@/enums/plan-type.enum';

export interface WhereDataFindAllPlansDTO {
  ids?: string[];
  app?: IWhereData;
  name?: IWhereDataSearch;
  description?: IWhereDataSearch;
  type?: PlanType;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysWhereDataFindAllPlansDTO = keyof WhereDataFindAllPlansDTO;

export interface OrderByDataFindAllPlansDTO {
  name?: IOrderBy;
  type?: IOrderBy;
  updatedBy?: IOrderBy;
  createdBy?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllPlansDTO = keyof OrderByDataFindAllPlansDTO;

export type FindAllPlansDTO = IBaseFindManyDTO<
  WhereDataFindAllPlansDTO,
  OrderByDataFindAllPlansDTO
>;
