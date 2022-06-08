import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllVideosDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysWhereDataFindAllVideosDTO = keyof WhereDataFindAllVideosDTO;

export interface OrderByDataFindAllVideosDTO {
  name?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllVideosDTO =
  keyof OrderByDataFindAllVideosDTO;

export type FindAllVideosDTO = IBaseFindManyDTO<
  WhereDataFindAllVideosDTO,
  OrderByDataFindAllVideosDTO
>;
