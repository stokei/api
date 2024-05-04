import { PlanType } from '@/enums/plan-type.enum';

const defaultPlanPriceAmounts = {
  [PlanType.STORAGE]: 0.005, // R$ 0,00005
  [PlanType.VIDEO]: 5 // R$ 0,05
};

export const getPlanPriceAmountByType = (type: PlanType) =>
  defaultPlanPriceAmounts[type];
