import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllAnswersDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysWhereDataFindAllAnswersDTO = keyof WhereDataFindAllAnswersDTO;

export interface OrderByDataFindAllAnswersDTO {
  name?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllAnswersDTO =
  keyof OrderByDataFindAllAnswersDTO;

export type FindAllAnswersDTO = IBaseFindManyDTO<
  WhereDataFindAllAnswersDTO,
  OrderByDataFindAllAnswersDTO
>;
