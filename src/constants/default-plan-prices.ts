import { PlanType } from '@/enums/plan-type.enum';

const defaultPlanPriceAmounts = {
  [PlanType.ADMIN]: 999, // R$ 9,99
  [PlanType.DOMAIN]: 1499, // R$ 14,99
  [PlanType.INSTRUCTOR]: 999, // R$ 9,99
  [PlanType.STORAGE]: 0.005, // R$ 0,00005
  [PlanType.VIDEO]: 4, // R$ 0,04
  [PlanType.VIDEO_VIEW]: 0.8 // R$ 0,008
};

export const getPlanPriceAmountByType = (type: PlanType) =>
  defaultPlanPriceAmounts[type];
