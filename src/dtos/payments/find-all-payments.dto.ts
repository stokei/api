import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllPaymentsDTO {
  ids?: string[];
  parent?: IWhereData;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysWhereDataFindAllPaymentsDTO =
  keyof WhereDataFindAllPaymentsDTO;

export interface OrderByDataFindAllPaymentsDTO {
  name?: IOrderBy;
  updatedBy?: IOrderBy;
  createdBy?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllPaymentsDTO =
  keyof OrderByDataFindAllPaymentsDTO;

export type FindAllPaymentsDTO = IBaseFindManyDTO<
  WhereDataFindAllPaymentsDTO,
  OrderByDataFindAllPaymentsDTO
>;
