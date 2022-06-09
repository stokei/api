import { ICommand } from '@nestjs/cqrs';

import {
  RemoveActivitiesActionDTO,
  RemoveActivitiesActionWhereDTO
} from '@/dtos/activities-actions/remove-activities-action.dto';

export class RemoveActivitiesActionCommand
  implements ICommand, RemoveActivitiesActionDTO
{
  where: RemoveActivitiesActionWhereDTO;
  constructor(data: RemoveActivitiesActionDTO) {
    this.where = data.where;
  }
}
