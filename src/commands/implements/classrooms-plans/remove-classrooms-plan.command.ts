import { ICommand } from '@nestjs/cqrs';

import {
  RemoveClassroomsPlanDTO,
  RemoveClassroomsPlanWhereDTO
} from '@/dtos/classrooms-plans/remove-classrooms-plan.dto';

export class RemoveClassroomsPlanCommand
  implements ICommand, RemoveClassroomsPlanDTO
{
  where: RemoveClassroomsPlanWhereDTO;
  constructor(data: RemoveClassroomsPlanDTO) {
    this.where = data.where;
  }
}
