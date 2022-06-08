import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllCartsDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysWhereDataFindAllCartsDTO = keyof WhereDataFindAllCartsDTO;

export interface OrderByDataFindAllCartsDTO {
  name?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllCartsDTO = keyof OrderByDataFindAllCartsDTO;

export type FindAllCartsDTO = IBaseFindManyDTO<
  WhereDataFindAllCartsDTO,
  OrderByDataFindAllCartsDTO
>;
