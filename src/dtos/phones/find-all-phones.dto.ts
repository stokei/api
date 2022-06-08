import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllPhonesDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysWhereDataFindAllPhonesDTO = keyof WhereDataFindAllPhonesDTO;

export interface OrderByDataFindAllPhonesDTO {
  name?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllPhonesDTO =
  keyof OrderByDataFindAllPhonesDTO;

export type FindAllPhonesDTO = IBaseFindManyDTO<
  WhereDataFindAllPhonesDTO,
  OrderByDataFindAllPhonesDTO
>;
