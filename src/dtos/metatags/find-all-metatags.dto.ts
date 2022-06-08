import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllMetatagsDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysWhereDataFindAllMetatagsDTO =
  keyof WhereDataFindAllMetatagsDTO;

export interface OrderByDataFindAllMetatagsDTO {
  name?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllMetatagsDTO =
  keyof OrderByDataFindAllMetatagsDTO;

export type FindAllMetatagsDTO = IBaseFindManyDTO<
  WhereDataFindAllMetatagsDTO,
  OrderByDataFindAllMetatagsDTO
>;
