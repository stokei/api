import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllPaymentsMethodsDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysWhereDataFindAllPaymentsMethodsDTO =
  keyof WhereDataFindAllPaymentsMethodsDTO;

export interface OrderByDataFindAllPaymentsMethodsDTO {
  name?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllPaymentsMethodsDTO =
  keyof OrderByDataFindAllPaymentsMethodsDTO;

export type FindAllPaymentsMethodsDTO = IBaseFindManyDTO<
  WhereDataFindAllPaymentsMethodsDTO,
  OrderByDataFindAllPaymentsMethodsDTO
>;
