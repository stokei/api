import { ICommand } from '@nestjs/cqrs';

import { CreatePlanDTO } from '@/dtos/plans/create-plan.dto';

export class CreatePlanCommand implements ICommand, CreatePlanDTO {
  name: string;
  parent: string;
  createdBy: string;

  constructor(data: CreatePlanDTO) {
    this.name = data.name;
    this.parent = data.parent;
    this.createdBy = data.createdBy;
  }
}
