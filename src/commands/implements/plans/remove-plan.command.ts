import { ICommand } from '@nestjs/cqrs';

import {
  RemovePlanDTO,
  RemovePlanWhereDTO
} from '@/dtos/plans/remove-plan.dto';

export class RemovePlanCommand implements ICommand, RemovePlanDTO {
  where: RemovePlanWhereDTO;
  constructor(data: RemovePlanDTO) {
    this.where = data.where;
  }
}
