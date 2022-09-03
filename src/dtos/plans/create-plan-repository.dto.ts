import { CreatePlanDTO } from './create-plan.dto';

export interface CreatePlanRepositoryDTO extends Omit<CreatePlanDTO, 'app'> {
  applicationFeePercentage: number;
}
