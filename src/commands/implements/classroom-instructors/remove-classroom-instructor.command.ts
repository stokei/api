import { ICommand } from '@nestjs/cqrs';

import {
  RemoveClassroomInstructorDTO,
  RemoveClassroomInstructorWhereDTO
} from '@/dtos/classroom-instructors/remove-classroom-instructor.dto';

export class RemoveClassroomInstructorCommand
  implements ICommand, RemoveClassroomInstructorDTO
{
  where: RemoveClassroomInstructorWhereDTO;
  constructor(data: RemoveClassroomInstructorDTO) {
    this.where = data.where;
  }
}
