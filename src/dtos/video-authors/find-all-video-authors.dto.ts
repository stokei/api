import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllVideoAuthorsDTO {
  ids?: string[];
  parent?: IWhereData;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysWhereDataFindAllVideoAuthorsDTO =
  keyof WhereDataFindAllVideoAuthorsDTO;

export interface OrderByDataFindAllVideoAuthorsDTO {
  name?: IOrderBy;
  updatedBy?: IOrderBy;
  createdBy?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllVideoAuthorsDTO =
  keyof OrderByDataFindAllVideoAuthorsDTO;

export type FindAllVideoAuthorsDTO = IBaseFindManyDTO<
  WhereDataFindAllVideoAuthorsDTO,
  OrderByDataFindAllVideoAuthorsDTO
>;
