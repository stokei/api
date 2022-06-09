import { ICommand } from '@nestjs/cqrs';

import {
  UpdateActivitiesActionDataDTO,
  UpdateActivitiesActionDTO,
  UpdateActivitiesActionWhereDTO
} from '@/dtos/activities-actions/update-activities-action.dto';

export class UpdateActivitiesActionCommand
  implements ICommand, UpdateActivitiesActionDTO
{
  data: UpdateActivitiesActionDataDTO;
  where: UpdateActivitiesActionWhereDTO;
  constructor(data: UpdateActivitiesActionDTO) {
    this.data = data.data;
    this.where = data.where;
  }
}
