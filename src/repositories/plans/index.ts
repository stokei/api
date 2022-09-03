import { CountPlansRepository } from './count-plans';
import { CreatePlanRepository } from './create-plan';
import { FindAllPlansRepository } from './find-all-plans';
import { FindPlanByIdRepository } from './find-plan-by-id';
import { UpdatePlanRepository } from './update-plan';

export const PlansRepositories = [
  CountPlansRepository,
  CreatePlanRepository,
  UpdatePlanRepository,
  FindPlanByIdRepository,
  FindAllPlansRepository
];
