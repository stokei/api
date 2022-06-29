import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountCoursesStudentsWhereDTO {
  ids?: string[];
  parent?: IWhereData;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysCountCoursesStudentsWhereDTO =
  keyof CountCoursesStudentsWhereDTO;

export type CountCoursesStudentsDTO =
  IBaseCountDTO<CountCoursesStudentsWhereDTO>;
