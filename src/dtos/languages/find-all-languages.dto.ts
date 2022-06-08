import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllLanguagesDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysWhereDataFindAllLanguagesDTO =
  keyof WhereDataFindAllLanguagesDTO;

export interface OrderByDataFindAllLanguagesDTO {
  name?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllLanguagesDTO =
  keyof OrderByDataFindAllLanguagesDTO;

export type FindAllLanguagesDTO = IBaseFindManyDTO<
  WhereDataFindAllLanguagesDTO,
  OrderByDataFindAllLanguagesDTO
>;
