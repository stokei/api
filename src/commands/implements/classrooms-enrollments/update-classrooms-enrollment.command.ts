import { ICommand } from '@nestjs/cqrs';

import {
  UpdateClassroomsEnrollmentDataDTO,
  UpdateClassroomsEnrollmentDTO,
  UpdateClassroomsEnrollmentWhereDTO
} from '@/dtos/classrooms-enrollments/update-classrooms-enrollment.dto';

export class UpdateClassroomsEnrollmentCommand
  implements ICommand, UpdateClassroomsEnrollmentDTO
{
  data: UpdateClassroomsEnrollmentDataDTO;
  where: UpdateClassroomsEnrollmentWhereDTO;
  constructor(data: UpdateClassroomsEnrollmentDTO) {
    this.data = data.data;
    this.where = data.where;
  }
}
