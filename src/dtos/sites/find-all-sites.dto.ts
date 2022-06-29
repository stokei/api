import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllSitesDTO {
  ids?: string[];
  parent?: IWhereData;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysWhereDataFindAllSitesDTO = keyof WhereDataFindAllSitesDTO;

export interface OrderByDataFindAllSitesDTO {
  name?: IOrderBy;
  updatedBy?: IOrderBy;
  createdBy?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllSitesDTO = keyof OrderByDataFindAllSitesDTO;

export type FindAllSitesDTO = IBaseFindManyDTO<
  WhereDataFindAllSitesDTO,
  OrderByDataFindAllSitesDTO
>;
