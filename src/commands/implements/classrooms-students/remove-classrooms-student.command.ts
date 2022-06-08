import { ICommand } from '@nestjs/cqrs';
import {
  RemoveClassroomsStudentDTO,
  RemoveClassroomsStudentWhereDTO
} from '@/dtos/classrooms-students/remove-classrooms-student.dto';

export class RemoveClassroomsStudentCommand
  implements ICommand, RemoveClassroomsStudentDTO
{
  where: RemoveClassroomsStudentWhereDTO;
  constructor(data: RemoveClassroomsStudentDTO) {
    this.where = data.where;
  }
}
