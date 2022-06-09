import { ICommand } from '@nestjs/cqrs';

import {
  RemoveClassroomsMaterialDTO,
  RemoveClassroomsMaterialWhereDTO
} from '@/dtos/classrooms-materials/remove-classrooms-material.dto';

export class RemoveClassroomsMaterialCommand
  implements ICommand, RemoveClassroomsMaterialDTO
{
  where: RemoveClassroomsMaterialWhereDTO;
  constructor(data: RemoveClassroomsMaterialDTO) {
    this.where = data.where;
  }
}
