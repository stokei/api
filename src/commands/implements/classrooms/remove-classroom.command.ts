import { ICommand } from '@nestjs/cqrs';
import {
  RemoveClassroomDTO,
  RemoveClassroomWhereDTO
} from '@/dtos/classrooms/remove-classroom.dto';

export class RemoveClassroomCommand implements ICommand, RemoveClassroomDTO {
  where: RemoveClassroomWhereDTO;
  constructor(data: RemoveClassroomDTO) {
    this.where = data.where;
  }
}
