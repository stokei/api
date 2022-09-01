import { CreatePlanDTO } from './create-plan.dto';

export interface CreatePlanRepositoryDTO extends CreatePlanDTO {
  applicationFeePercentage: number;
}
