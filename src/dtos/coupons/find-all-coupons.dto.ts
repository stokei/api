import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllCouponsDTO {
  ids?: string[];
  app?: IWhereData;
  parent?: IWhereDataSearch;
  recipient?: IWhereData;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysWhereDataFindAllCouponsDTO = keyof WhereDataFindAllCouponsDTO;

export interface OrderByDataFindAllCouponsDTO {
  code?: IOrderBy;
  updatedBy?: IOrderBy;
  createdBy?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllCouponsDTO =
  keyof OrderByDataFindAllCouponsDTO;

export type FindAllCouponsDTO = IBaseFindManyDTO<
  WhereDataFindAllCouponsDTO,
  OrderByDataFindAllCouponsDTO
>;
