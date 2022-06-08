import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllClassroomsAdminsDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysWhereDataFindAllClassroomsAdminsDTO =
  keyof WhereDataFindAllClassroomsAdminsDTO;

export interface OrderByDataFindAllClassroomsAdminsDTO {
  name?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllClassroomsAdminsDTO =
  keyof OrderByDataFindAllClassroomsAdminsDTO;

export type FindAllClassroomsAdminsDTO = IBaseFindManyDTO<
  WhereDataFindAllClassroomsAdminsDTO,
  OrderByDataFindAllClassroomsAdminsDTO
>;
