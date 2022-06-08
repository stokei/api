import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllVideosMaterialsDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysWhereDataFindAllVideosMaterialsDTO =
  keyof WhereDataFindAllVideosMaterialsDTO;

export interface OrderByDataFindAllVideosMaterialsDTO {
  name?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllVideosMaterialsDTO =
  keyof OrderByDataFindAllVideosMaterialsDTO;

export type FindAllVideosMaterialsDTO = IBaseFindManyDTO<
  WhereDataFindAllVideosMaterialsDTO,
  OrderByDataFindAllVideosMaterialsDTO
>;
