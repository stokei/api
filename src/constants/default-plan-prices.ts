import { PlanType } from '@/enums/plan-type.enum';

const defaultPlanPriceAmounts = {
  [PlanType.STORAGE]: 0.5, // R$ 0,005
  [PlanType.VIDEO]: 5 // R$ 0,05
};

export const getPlanPriceAmountByType = (type: PlanType) =>
  defaultPlanPriceAmounts[type];
