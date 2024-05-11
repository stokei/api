import { PlanType } from '@/enums/plan-type.enum';

const defaultPlanPriceAmounts = {
  [PlanType.STORAGE]: 0.6, // R$ 0,006
  [PlanType.VIDEO]: 6 // R$ 0,06
};

export const getPlanPriceAmountByType = (type: PlanType) =>
  defaultPlanPriceAmounts[type];
