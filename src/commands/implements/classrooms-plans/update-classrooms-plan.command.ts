import { ICommand } from '@nestjs/cqrs';

import {
  UpdateClassroomsPlanDataDTO,
  UpdateClassroomsPlanDTO,
  UpdateClassroomsPlanWhereDTO
} from '@/dtos/classrooms-plans/update-classrooms-plan.dto';

export class UpdateClassroomsPlanCommand
  implements ICommand, UpdateClassroomsPlanDTO
{
  data: UpdateClassroomsPlanDataDTO;
  where: UpdateClassroomsPlanWhereDTO;
  constructor(data: UpdateClassroomsPlanDTO) {
    this.data = data.data;
    this.where = data.where;
  }
}
