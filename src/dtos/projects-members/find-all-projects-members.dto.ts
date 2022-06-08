import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllProjectsMembersDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysWhereDataFindAllProjectsMembersDTO =
  keyof WhereDataFindAllProjectsMembersDTO;

export interface OrderByDataFindAllProjectsMembersDTO {
  name?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllProjectsMembersDTO =
  keyof OrderByDataFindAllProjectsMembersDTO;

export type FindAllProjectsMembersDTO = IBaseFindManyDTO<
  WhereDataFindAllProjectsMembersDTO,
  OrderByDataFindAllProjectsMembersDTO
>;
