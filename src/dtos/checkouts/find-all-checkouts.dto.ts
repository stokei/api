import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllCheckoutsDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysWhereDataFindAllCheckoutsDTO =
  keyof WhereDataFindAllCheckoutsDTO;

export interface OrderByDataFindAllCheckoutsDTO {
  name?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllCheckoutsDTO =
  keyof OrderByDataFindAllCheckoutsDTO;

export type FindAllCheckoutsDTO = IBaseFindManyDTO<
  WhereDataFindAllCheckoutsDTO,
  OrderByDataFindAllCheckoutsDTO
>;
