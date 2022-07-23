import { PlanStatus } from '@/enums/plan-status.enum';
import { PlanType } from '@/enums/plan-type.enum';

export interface CreatePlanDTO {
  parent: string;
  name: string;
  type: PlanType;
  checkoutVisible: boolean;
  status: PlanStatus;
  hasCustomDomain: boolean;
  hasCustomSite: boolean;
  quantityCourses: number;
  quantityInstructorPerCourses: number;
  quantityClassroomsPerCourses: number;
  quantityModulesPerClassrooms: number;
  quantityVideosPerModules: number;
  applicationFeePercentage: number;
  createdBy: string;
}
