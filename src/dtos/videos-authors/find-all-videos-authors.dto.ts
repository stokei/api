import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllVideosAuthorsDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysWhereDataFindAllVideosAuthorsDTO =
  keyof WhereDataFindAllVideosAuthorsDTO;

export interface OrderByDataFindAllVideosAuthorsDTO {
  name?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllVideosAuthorsDTO =
  keyof OrderByDataFindAllVideosAuthorsDTO;

export type FindAllVideosAuthorsDTO = IBaseFindManyDTO<
  WhereDataFindAllVideosAuthorsDTO,
  OrderByDataFindAllVideosAuthorsDTO
>;
