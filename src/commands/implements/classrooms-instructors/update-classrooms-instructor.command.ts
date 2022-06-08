import { ICommand } from '@nestjs/cqrs';
import {
  UpdateClassroomsInstructorDTO,
  UpdateClassroomsInstructorDataDTO,
  UpdateClassroomsInstructorWhereDTO
} from '@/dtos/classrooms-instructors/update-classrooms-instructor.dto';

export class UpdateClassroomsInstructorCommand
  implements ICommand, UpdateClassroomsInstructorDTO
{
  data: UpdateClassroomsInstructorDataDTO;
  where: UpdateClassroomsInstructorWhereDTO;
  constructor(data: UpdateClassroomsInstructorDTO) {
    this.data = data.data;
    this.where = data.where;
  }
}
