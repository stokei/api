import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllPlansDTO {
  ids?: string[];
  parent?: IWhereData;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysWhereDataFindAllPlansDTO = keyof WhereDataFindAllPlansDTO;

export interface OrderByDataFindAllPlansDTO {
  name?: IOrderBy;
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
