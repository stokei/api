import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllCouponsDTO {
  ids?: string[];
  app?: IWhereData;
  code?: IWhereDataSearch;
  parent?: IWhereDataSearch;
  recipient?: IWhereData;
  active?: IWhereData<boolean>;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysWhereDataFindAllCouponsDTO = keyof WhereDataFindAllCouponsDTO;

export interface OrderByDataFindAllCouponsDTO {
  code?: IOrderBy;
  active?: IOrderBy;
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
