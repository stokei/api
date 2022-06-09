import { ICommand } from '@nestjs/cqrs';

import {
  UpdateClassroomsMaterialDataDTO,
  UpdateClassroomsMaterialDTO,
  UpdateClassroomsMaterialWhereDTO
} from '@/dtos/classrooms-materials/update-classrooms-material.dto';

export class UpdateClassroomsMaterialCommand
  implements ICommand, UpdateClassroomsMaterialDTO
{
  data: UpdateClassroomsMaterialDataDTO;
  where: UpdateClassroomsMaterialWhereDTO;
  constructor(data: UpdateClassroomsMaterialDTO) {
    this.data = data.data;
    this.where = data.where;
  }
}
