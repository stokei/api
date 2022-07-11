import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountCourseStudentsWhereDTO {
  ids?: string[];
  parent?: IWhereData;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysCountCourseStudentsWhereDTO =
  keyof CountCourseStudentsWhereDTO;

export type CountCourseStudentsDTO = IBaseCountDTO<CountCourseStudentsWhereDTO>;
