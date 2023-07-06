import { PlanType } from '@/enums/plan-type.enum';

export interface CreatePlanDTO {
  app: string;
  name: string;
  icon?: string;
  description?: string;
  type: PlanType;
  createdBy: string;
}
