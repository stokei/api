import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllSortedItemsDTO {
  ids?: string[];
  app?: IWhereData;
  parent?: IWhereDataSearch;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysWhereDataFindAllSortedItemsDTO =
  keyof WhereDataFindAllSortedItemsDTO;

export interface OrderByDataFindAllSortedItemsDTO {
  index?: IOrderBy;
}
export type IKeysOrderByDataFindAllSortedItemsDTO =
  keyof OrderByDataFindAllSortedItemsDTO;

export type FindAllSortedItemsDTO = IBaseFindManyDTO<
  WhereDataFindAllSortedItemsDTO,
  OrderByDataFindAllSortedItemsDTO
>;
