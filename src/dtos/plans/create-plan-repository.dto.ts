import { CreatePlanDTO } from './create-plan.dto';

export interface CreatePlanRepositoryDTO
  extends Omit<CreatePlanDTO, 'app' | 'fromApp'> {
  name: string;
  applicationFeePercentage: number;
}
