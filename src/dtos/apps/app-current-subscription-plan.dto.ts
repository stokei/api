import { PlanModel } from '@/models/plan.model';
import { SubscriptionContractModel } from '@/models/subscription-contract.model';

export interface AppCurrentSubscriptionPlan {
  subscription: SubscriptionContractModel;
  plan: PlanModel;
}
