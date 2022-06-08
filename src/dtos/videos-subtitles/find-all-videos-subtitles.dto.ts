import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllVideosSubtitlesDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysWhereDataFindAllVideosSubtitlesDTO =
  keyof WhereDataFindAllVideosSubtitlesDTO;

export interface OrderByDataFindAllVideosSubtitlesDTO {
  name?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllVideosSubtitlesDTO =
  keyof OrderByDataFindAllVideosSubtitlesDTO;

export type FindAllVideosSubtitlesDTO = IBaseFindManyDTO<
  WhereDataFindAllVideosSubtitlesDTO,
  OrderByDataFindAllVideosSubtitlesDTO
>;
