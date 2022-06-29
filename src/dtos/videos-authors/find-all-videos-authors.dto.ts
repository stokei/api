import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllVideosAuthorsDTO {
  ids?: string[];
  parent?: IWhereData;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysWhereDataFindAllVideosAuthorsDTO =
  keyof WhereDataFindAllVideosAuthorsDTO;

export interface OrderByDataFindAllVideosAuthorsDTO {
  name?: IOrderBy;
  updatedBy?: IOrderBy;
  createdBy?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllVideosAuthorsDTO =
  keyof OrderByDataFindAllVideosAuthorsDTO;

export type FindAllVideosAuthorsDTO = IBaseFindManyDTO<
  WhereDataFindAllVideosAuthorsDTO,
  OrderByDataFindAllVideosAuthorsDTO
>;
