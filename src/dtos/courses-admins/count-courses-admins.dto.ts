import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountCoursesAdminsWhereDTO {
  ids?: string[];
  parent?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysCountCoursesAdminsWhereDTO = keyof CountCoursesAdminsWhereDTO;

export type CountCoursesAdminsDTO = IBaseCountDTO<CountCoursesAdminsWhereDTO>;
