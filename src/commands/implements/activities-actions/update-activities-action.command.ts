import { ICommand } from '@nestjs/cqrs';
import {
  UpdateActivitiesActionDTO,
  UpdateActivitiesActionDataDTO,
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
