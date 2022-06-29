import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllProjectsDTO {
  ids?: string[];
  parent?: IWhereData;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysWhereDataFindAllProjectsDTO =
  keyof WhereDataFindAllProjectsDTO;

export interface OrderByDataFindAllProjectsDTO {
  name?: IOrderBy;
  updatedBy?: IOrderBy;
  createdBy?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllProjectsDTO =
  keyof OrderByDataFindAllProjectsDTO;

export type FindAllProjectsDTO = IBaseFindManyDTO<
  WhereDataFindAllProjectsDTO,
  OrderByDataFindAllProjectsDTO
>;
