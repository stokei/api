import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllVideosTagsDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysWhereDataFindAllVideosTagsDTO =
  keyof WhereDataFindAllVideosTagsDTO;

export interface OrderByDataFindAllVideosTagsDTO {
  name?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllVideosTagsDTO =
  keyof OrderByDataFindAllVideosTagsDTO;

export type FindAllVideosTagsDTO = IBaseFindManyDTO<
  WhereDataFindAllVideosTagsDTO,
  OrderByDataFindAllVideosTagsDTO
>;
