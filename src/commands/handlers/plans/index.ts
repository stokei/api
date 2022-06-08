import { CreatePlanCommandHandler } from './create-plan';
import { RemovePlanCommandHandler } from './remove-plan';
import { UpdatePlanCommandHandler } from './update-plan';

export const PlanCommandHandlers = [
  CreatePlanCommandHandler,
  RemovePlanCommandHandler,
  UpdatePlanCommandHandler
];
