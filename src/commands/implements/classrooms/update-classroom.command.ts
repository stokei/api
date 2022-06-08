import { ICommand } from '@nestjs/cqrs';
import {
  UpdateClassroomDTO,
  UpdateClassroomDataDTO,
  UpdateClassroomWhereDTO
} from '@/dtos/classrooms/update-classroom.dto';

export class UpdateClassroomCommand implements ICommand, UpdateClassroomDTO {
  data: UpdateClassroomDataDTO;
  where: UpdateClassroomWhereDTO;
  constructor(data: UpdateClassroomDTO) {
    this.data = data.data;
    this.where = data.where;
  }
}
