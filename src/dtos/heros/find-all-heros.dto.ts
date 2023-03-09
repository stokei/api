import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllHerosDTO {
  ids?: string[];
  app?: IWhereData;
  parent?: IWhereDataSearch;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysWhereDataFindAllHerosDTO = keyof WhereDataFindAllHerosDTO;

export interface OrderByDataFindAllHerosDTO {
  updatedBy?: IOrderBy;
  createdBy?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllHerosDTO = keyof OrderByDataFindAllHerosDTO;

export type FindAllHerosDTO = IBaseFindManyDTO<
  WhereDataFindAllHerosDTO,
  OrderByDataFindAllHerosDTO
>;
