import { ICommand } from '@nestjs/cqrs';

import { CreatePlanDTO } from '@/dtos/plans/create-plan.dto';
import { PlanType } from '@/enums/plan-type.enum';

export class CreatePlanCommand implements ICommand, CreatePlanDTO {
  app: string;
  name: string;
  description?: string;
  type: PlanType;
  createdBy: string;

  constructor(data: CreatePlanDTO) {
    this.app = data.app;
    this.name = data.name;
    this.description = data.description;
    this.type = data.type;
    this.createdBy = data.createdBy;
  }
}
