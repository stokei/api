import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllVersionsDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysWhereDataFindAllVersionsDTO =
  keyof WhereDataFindAllVersionsDTO;

export interface OrderByDataFindAllVersionsDTO {
  name?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllVersionsDTO =
  keyof OrderByDataFindAllVersionsDTO;

export type FindAllVersionsDTO = IBaseFindManyDTO<
  WhereDataFindAllVersionsDTO,
  OrderByDataFindAllVersionsDTO
>;
