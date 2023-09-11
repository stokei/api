import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllVersionsDTO {
  ids?: string[];
  app?: IWhereData;
  parent?: IWhereDataSearch;
  name?: IWhereDataSearch;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysWhereDataFindAllVersionsDTO =
  keyof WhereDataFindAllVersionsDTO;

export interface OrderByDataFindAllVersionsDTO {
  title?: IOrderBy;
  updatedBy?: IOrderBy;
  createdBy?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllVersionsDTO =
  keyof OrderByDataFindAllVersionsDTO;

export type FindAllVersionsDTO = IBaseFindManyDTO<
  WhereDataFindAllVersionsDTO,
  OrderByDataFindAllVersionsDTO
>;
