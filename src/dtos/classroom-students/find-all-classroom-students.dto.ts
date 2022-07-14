import { IBaseFindManyDTO, IOrderBy, IWhereData } from '@stokei/nestjs';

export interface WhereDataFindAllClassroomStudentsDTO {
  ids?: string[];
  classroom?: IWhereData;
  student?: IWhereData;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysWhereDataFindAllClassroomStudentsDTO =
  keyof WhereDataFindAllClassroomStudentsDTO;

export interface OrderByDataFindAllClassroomStudentsDTO {
  updatedBy?: IOrderBy;
  createdBy?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllClassroomStudentsDTO =
  keyof OrderByDataFindAllClassroomStudentsDTO;

export type FindAllClassroomStudentsDTO = IBaseFindManyDTO<
  WhereDataFindAllClassroomStudentsDTO,
  OrderByDataFindAllClassroomStudentsDTO
>;
