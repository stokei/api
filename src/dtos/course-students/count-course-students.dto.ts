import { IBaseCountDTO, IWhereData } from '@stokei/nestjs';

export interface CountCourseStudentsWhereDTO {
  ids?: string[];
  app?: IWhereData;
  course?: IWhereData;
  student?: IWhereData;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysCountCourseStudentsWhereDTO =
  keyof CountCourseStudentsWhereDTO;

export type CountCourseStudentsDTO = IBaseCountDTO<CountCourseStudentsWhereDTO>;
