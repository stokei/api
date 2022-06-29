import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllImagesDTO {
  ids?: string[];
  parent?: IWhereData;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysWhereDataFindAllImagesDTO = keyof WhereDataFindAllImagesDTO;

export interface OrderByDataFindAllImagesDTO {
  name?: IOrderBy;
  updatedBy?: IOrderBy;
  createdBy?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllImagesDTO =
  keyof OrderByDataFindAllImagesDTO;

export type FindAllImagesDTO = IBaseFindManyDTO<
  WhereDataFindAllImagesDTO,
  OrderByDataFindAllImagesDTO
>;
