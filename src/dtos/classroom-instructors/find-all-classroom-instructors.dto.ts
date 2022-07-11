import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

export interface WhereDataFindAllClassroomInstructorsDTO {
  ids?: string[];
  parent?: IWhereData;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysWhereDataFindAllClassroomInstructorsDTO =
  keyof WhereDataFindAllClassroomInstructorsDTO;

export interface OrderByDataFindAllClassroomInstructorsDTO {
  name?: IOrderBy;
  updatedBy?: IOrderBy;
  createdBy?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllClassroomInstructorsDTO =
  keyof OrderByDataFindAllClassroomInstructorsDTO;

export type FindAllClassroomInstructorsDTO = IBaseFindManyDTO<
  WhereDataFindAllClassroomInstructorsDTO,
  OrderByDataFindAllClassroomInstructorsDTO
>;
