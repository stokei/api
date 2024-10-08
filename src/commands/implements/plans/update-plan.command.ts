import { ICommand } from '@nestjs/cqrs';

import {
  UpdatePlanDataDTO,
  UpdatePlanDTO,
  UpdatePlanWhereDTO
} from '@/dtos/plans/update-plan.dto';

export class UpdatePlanCommand implements ICommand, UpdatePlanDTO {
  data: UpdatePlanDataDTO;
  where: UpdatePlanWhereDTO;
  constructor(data: UpdatePlanDTO) {
    this.data = data.data;
    this.where = data.where;
  }
}
