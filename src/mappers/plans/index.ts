import { convertToISODateString } from '@stokei/nestjs';
import { PlanEntity } from '@/entities';
import { PlanModel } from '@/models/plan.model';

export class PlanMapper {
  toModel(plan: PlanEntity) {
    return (
      plan &&
      new PlanModel({
        ...plan,
        updatedAt: convertToISODateString(plan.updatedAt),
        createdAt: convertToISODateString(plan.createdAt)
      })
    );
  }
  toModels(plans: PlanEntity[]) {
    return plans?.length > 0 ? plans.map(this.toModel).filter(Boolean) : [];
  }
}
