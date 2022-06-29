import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllPhonesDTO {
  ids?: string[];
  parent?: IWhereData;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysWhereDataFindAllPhonesDTO = keyof WhereDataFindAllPhonesDTO;

export interface OrderByDataFindAllPhonesDTO {
  name?: IOrderBy;
  updatedBy?: IOrderBy;
  createdBy?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllPhonesDTO =
  keyof OrderByDataFindAllPhonesDTO;

export type FindAllPhonesDTO = IBaseFindManyDTO<
  WhereDataFindAllPhonesDTO,
  OrderByDataFindAllPhonesDTO
>;
