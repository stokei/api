import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllTagsDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysWhereDataFindAllTagsDTO = keyof WhereDataFindAllTagsDTO;

export interface OrderByDataFindAllTagsDTO {
  name?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllTagsDTO = keyof OrderByDataFindAllTagsDTO;

export type FindAllTagsDTO = IBaseFindManyDTO<
  WhereDataFindAllTagsDTO,
  OrderByDataFindAllTagsDTO
>;
