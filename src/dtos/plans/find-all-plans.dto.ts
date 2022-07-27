import {
  IBaseFindManyDTO,
  IOrderBy,
  IWhereData,
  IWhereDataSearch
} from '@stokei/nestjs';

import { PlanStatus } from '@/enums/plan-status.enum';
import { PlanType } from '@/enums/plan-type.enum';

export interface WhereDataFindAllPlansDTO {
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
export type IKeysWhereDataFindAllPlansDTO = keyof WhereDataFindAllPlansDTO;

export interface OrderByDataFindAllPlansDTO {
  name?: IOrderBy;
  type?: IOrderBy;
  checkoutVisible?: IOrderBy;
  status?: IOrderBy;
  hasCustomDomain?: IOrderBy;
  hasCustomSite?: IOrderBy;
  quantityCourses?: IOrderBy;
  quantityInstructorPerCourses?: IOrderBy;
  quantityClassroomsPerCourses?: IOrderBy;
  quantityModulesPerClassrooms?: IOrderBy;
  quantityVideosPerModules?: IOrderBy;
  applicationFeePercentage?: IOrderBy;
  updatedBy?: IOrderBy;
  createdBy?: IOrderBy;
  createdAt?: IOrderBy;
  updatedAt?: IOrderBy;
}
export type IKeysOrderByDataFindAllPlansDTO = keyof OrderByDataFindAllPlansDTO;

export type FindAllPlansDTO = IBaseFindManyDTO<
  WhereDataFindAllPlansDTO,
  OrderByDataFindAllPlansDTO
>;
