import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllOrdersDTO {
  ids?: string[];
  app?: IWhereData;
  parent?: IWhereDataSearch;
  name?: IWhereDataSearch;
  description?: IWhereDataSearch;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysWhereDataFindAllOrdersDTO = keyof WhereDataFindAllOrdersDTO;

export interface OrderByDataFindAllOrdersDTO {
  name?: IOrderBy;
  updatedBy?: IOrderBy;
  createdBy?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllOrdersDTO =
  keyof OrderByDataFindAllOrdersDTO;

export type FindAllOrdersDTO = IBaseFindManyDTO<
  WhereDataFindAllOrdersDTO,
  OrderByDataFindAllOrdersDTO
>;
