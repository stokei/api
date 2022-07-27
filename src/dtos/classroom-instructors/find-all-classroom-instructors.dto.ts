import { IBaseFindManyDTO, IOrderBy, IWhereData } from '@stokei/nestjs';

export interface WhereDataFindAllClassroomInstructorsDTO {
  ids?: string[];
  app?: IWhereData;
  classroom?: IWhereData;
  instructor?: IWhereData;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysWhereDataFindAllClassroomInstructorsDTO =
  keyof WhereDataFindAllClassroomInstructorsDTO;

export interface OrderByDataFindAllClassroomInstructorsDTO {
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
