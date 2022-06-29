import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

export interface CountCoursesWhereDTO {
  ids?: string[];
  parent?: IWhereData;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
  name?: IWhereDataSearch;
}
export type IKeysCountCoursesWhereDTO = keyof CountCoursesWhereDTO;

export type CountCoursesDTO = IBaseCountDTO<CountCoursesWhereDTO>;
