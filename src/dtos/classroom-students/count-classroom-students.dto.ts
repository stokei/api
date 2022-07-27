import { IBaseCountDTO, IWhereData } from '@stokei/nestjs';

export interface CountClassroomStudentsWhereDTO {
  ids?: string[];
  app?: IWhereData;
  classroom?: IWhereData;
  student?: IWhereData;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysCountClassroomStudentsWhereDTO =
  keyof CountClassroomStudentsWhereDTO;

export type CountClassroomStudentsDTO =
  IBaseCountDTO<CountClassroomStudentsWhereDTO>;
