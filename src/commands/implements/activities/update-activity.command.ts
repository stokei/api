import { ICommand } from '@nestjs/cqrs';
import {
  UpdateActivityDTO,
  UpdateActivityDataDTO,
  UpdateActivityWhereDTO
} from '@/dtos/activities/update-activity.dto';

export class UpdateActivityCommand implements ICommand, UpdateActivityDTO {
  data: UpdateActivityDataDTO;
  where: UpdateActivityWhereDTO;
  constructor(data: UpdateActivityDTO) {
    this.data = data.data;
    this.where = data.where;
  }
}
