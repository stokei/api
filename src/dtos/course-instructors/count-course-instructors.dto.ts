import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountCourseInstructorsWhereDTO {
  ids?: string[];
  parent?: IWhereData;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysCountCourseInstructorsWhereDTO =
  keyof CountCourseInstructorsWhereDTO;

export type CountCourseInstructorsDTO =
  IBaseCountDTO<CountCourseInstructorsWhereDTO>;
