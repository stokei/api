import { IBaseCountDTO, IWhereData, IWhereDataSearch } from '@stokei/nestjs';

import { PlanStatus } from '@/enums/plan-status.enum';
import { PlanType } from '@/enums/plan-type.enum';

export interface CountPlansWhereDTO {
  ids?: string[];
  app?: IWhereData;
  name?: IWhereDataSearch;
  type?: PlanType;
  checkoutVisible?: IWhereData<boolean>;
  status?: PlanStatus;
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
