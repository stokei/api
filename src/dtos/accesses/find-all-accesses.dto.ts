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
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysWhereDataFindAllAccessesDTO =
  keyof WhereDataFindAllAccessesDTO;

export interface OrderByDataFindAllAccessesDTO {
  name?: IOrderBy;
  updatedBy?: IOrderBy;
  createdBy?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllAccessesDTO =
  keyof OrderByDataFindAllAccessesDTO;

export type FindAllAccessesDTO = IBaseFindManyDTO<
  WhereDataFindAllAccessesDTO,
  OrderByDataFindAllAccessesDTO
>;
