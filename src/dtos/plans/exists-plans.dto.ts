import { PlanStatus } from '@/enums/plan-status.enum';
import { PlanType } from '@/enums/plan-type.enum';

export interface ExistsPlansWhereDTO {
  parent?: string;
  name?: string;
  type?: PlanType;
  checkoutVisible?: boolean;
  status?: PlanStatus;
  hasCustomDomain?: boolean;
  hasCustomSite?: boolean;
  quantityCourses?: number;
  quantityInstructorPerCourses?: number;
  quantityClassroomsPerCourses?: number;
  quantityModulesPerClassrooms?: number;
  quantityVideosPerModules?: number;
  salesCommissionPercentage?: number;
}

export interface ExistsPlansDTO {
  where: ExistsPlansWhereDTO;
}
