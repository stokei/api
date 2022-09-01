import { IBaseCountDTO, IWhereData } from '@stokei/nestjs';

export interface CountPlansWhereDTO {
  ids?: string[];
  app?: IWhereData;
  active?: IWhereData<boolean>;
  hasCustomDomain?: IWhereData<boolean>;
  hasCustomSite?: IWhereData<boolean>;
  quantityCourses?: IWhereData<number>;
  quantityInstructorPerCourses?: IWhereData<number>;
  quantityClassroomsPerCourses?: IWhereData<number>;
  quantityModulesPerClassrooms?: IWhereData<number>;
  quantityVideosPerModules?: IWhereData<number>;
  applicationFeePercentage?: IWhereData<number>;
  updatedBy?: IWhereData;
  createdBy?: IWhereData;
}
export type IKeysCountPlansWhereDTO = keyof CountPlansWhereDTO;

export type CountPlansDTO = IBaseCountDTO<CountPlansWhereDTO>;
