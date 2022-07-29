import { PlanStatus } from '@/enums/plan-status.enum';

import { CreatePlanDTO } from './create-plan.dto';

export interface CreatePlanRepositoryDTO extends CreatePlanDTO {
  status: PlanStatus;
}
