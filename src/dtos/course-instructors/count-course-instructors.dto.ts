import { IBaseCountDTO, IWhereData } from '@stokei/nestjs';

export interface CountCourseInstructorsWhereDTO {
  ids?: string[];
  app?: IWhereData;
  course?: IWhereData<string | string[]>;
  instructor?: IWhereData<string | string[]>;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysCountCourseInstructorsWhereDTO =
  keyof CountCourseInstructorsWhereDTO;

export type CountCourseInstructorsDTO =
  IBaseCountDTO<CountCourseInstructorsWhereDTO>;
