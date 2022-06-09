import { ICommand } from '@nestjs/cqrs';

import {
  RemoveActivityDTO,
  RemoveActivityWhereDTO
} from '@/dtos/activities/remove-activity.dto';

export class RemoveActivityCommand implements ICommand, RemoveActivityDTO {
  where: RemoveActivityWhereDTO;
  constructor(data: RemoveActivityDTO) {
    this.where = data.where;
  }
}
