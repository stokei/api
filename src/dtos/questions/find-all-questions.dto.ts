import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllQuestionsDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysWhereDataFindAllQuestionsDTO =
  keyof WhereDataFindAllQuestionsDTO;

export interface OrderByDataFindAllQuestionsDTO {
  name?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllQuestionsDTO =
  keyof OrderByDataFindAllQuestionsDTO;

export type FindAllQuestionsDTO = IBaseFindManyDTO<
  WhereDataFindAllQuestionsDTO,
  OrderByDataFindAllQuestionsDTO
>;
