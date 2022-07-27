import { PlanType } from '@/enums/plan-type.enum';

export interface CreatePlanDTO {
  name: string;
  type: PlanType;
  checkoutVisible: boolean;
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
