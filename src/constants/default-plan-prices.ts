import { PlanType } from '@/enums/plan-type.enum';

const defaultPlanPriceAmounts = {
  [PlanType.ADMIN]: 999,
  [PlanType.DOMAIN]: 1499,
  [PlanType.INSTRUCTOR]: 999,
  [PlanType.STORAGE]: 0.035,
  [PlanType.VIDEO]: 0.05
};

export const getPlanPriceAmountByType = (type: PlanType) =>
  defaultPlanPriceAmounts[type];
