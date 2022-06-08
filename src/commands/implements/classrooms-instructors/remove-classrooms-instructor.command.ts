import { ICommand } from '@nestjs/cqrs';
import {
  RemoveClassroomsInstructorDTO,
  RemoveClassroomsInstructorWhereDTO
} from '@/dtos/classrooms-instructors/remove-classrooms-instructor.dto';

export class RemoveClassroomsInstructorCommand
  implements ICommand, RemoveClassroomsInstructorDTO
{
  where: RemoveClassroomsInstructorWhereDTO;
  constructor(data: RemoveClassroomsInstructorDTO) {
    this.where = data.where;
  }
}
