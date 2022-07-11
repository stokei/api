import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllPaymentMethodsDTO {
  ids?: string[];
  parent?: IWhereData;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysWhereDataFindAllPaymentMethodsDTO =
  keyof WhereDataFindAllPaymentMethodsDTO;

export interface OrderByDataFindAllPaymentMethodsDTO {
  name?: IOrderBy;
  updatedBy?: IOrderBy;
  createdBy?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllPaymentMethodsDTO =
  keyof OrderByDataFindAllPaymentMethodsDTO;

export type FindAllPaymentMethodsDTO = IBaseFindManyDTO<
  WhereDataFindAllPaymentMethodsDTO,
  OrderByDataFindAllPaymentMethodsDTO
>;
