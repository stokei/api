import { ICommand } from '@nestjs/cqrs';

import {
  UpdateClassroomInstructorDataDTO,
  UpdateClassroomInstructorDTO,
  UpdateClassroomInstructorWhereDTO
} from '@/dtos/classroom-instructors/update-classroom-instructor.dto';

export class UpdateClassroomInstructorCommand
  implements ICommand, UpdateClassroomInstructorDTO
{
  data: UpdateClassroomInstructorDataDTO;
  where: UpdateClassroomInstructorWhereDTO;
  constructor(data: UpdateClassroomInstructorDTO) {
    this.data = data.data;
    this.where = data.where;
  }
}
