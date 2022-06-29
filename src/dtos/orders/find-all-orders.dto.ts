import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllOrdersDTO {
  ids?: string[];
  parent?: IWhereData;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
  name?: IWhereDataSearch;
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
