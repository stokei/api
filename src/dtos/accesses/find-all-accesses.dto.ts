import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllAccessesDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysWhereDataFindAllAccessesDTO =
  keyof WhereDataFindAllAccessesDTO;

export interface OrderByDataFindAllAccessesDTO {
  name?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllAccessesDTO =
  keyof OrderByDataFindAllAccessesDTO;

export type FindAllAccessesDTO = IBaseFindManyDTO<
  WhereDataFindAllAccessesDTO,
  OrderByDataFindAllAccessesDTO
>;
