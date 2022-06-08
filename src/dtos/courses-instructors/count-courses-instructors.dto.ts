import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountCoursesInstructorsWhereDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysCountCoursesInstructorsWhereDTO =
  keyof CountCoursesInstructorsWhereDTO;

export type CountCoursesInstructorsDTO =
  IBaseCountDTO<CountCoursesInstructorsWhereDTO>;
