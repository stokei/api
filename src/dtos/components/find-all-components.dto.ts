import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

import { ComponentType } from '@/enums/component-type.enum';

export interface WhereDataFindAllComponentsDTO {
  ids?: string[];
  app?: IWhereData;
  parent?: IWhereDataSearch;
  type?: ComponentType;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysWhereDataFindAllComponentsDTO =
  keyof WhereDataFindAllComponentsDTO;

export interface OrderByDataFindAllComponentsDTO {
  updatedBy?: IOrderBy;
  createdBy?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllComponentsDTO =
  keyof OrderByDataFindAllComponentsDTO;

export type FindAllComponentsDTO = IBaseFindManyDTO<
  WhereDataFindAllComponentsDTO,
  OrderByDataFindAllComponentsDTO
>;
