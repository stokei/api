import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllVideosDTO {
  ids?: string[];
  app?: IWhereData;
  parent?: IWhereDataSearch;
  name?: IWhereDataSearch;
  slug?: IWhereData<string>;
  description?: IWhereDataSearch;
  active?: IWhereData<boolean>;
  private?: IWhereData<boolean>;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysWhereDataFindAllVideosDTO = keyof WhereDataFindAllVideosDTO;

export interface OrderByDataFindAllVideosDTO {
  name?: IOrderBy;
  slug?: IOrderBy;
  active?: IOrderBy;
  private?: IOrderBy;
  updatedBy?: IOrderBy;
  createdBy?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllVideosDTO =
  keyof OrderByDataFindAllVideosDTO;

export type FindAllVideosDTO = IBaseFindManyDTO<
  WhereDataFindAllVideosDTO,
  OrderByDataFindAllVideosDTO
>;
