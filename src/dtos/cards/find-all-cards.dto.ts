import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllCardsDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysWhereDataFindAllCardsDTO = keyof WhereDataFindAllCardsDTO;

export interface OrderByDataFindAllCardsDTO {
  name?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllCardsDTO = keyof OrderByDataFindAllCardsDTO;

export type FindAllCardsDTO = IBaseFindManyDTO<
  WhereDataFindAllCardsDTO,
  OrderByDataFindAllCardsDTO
>;
