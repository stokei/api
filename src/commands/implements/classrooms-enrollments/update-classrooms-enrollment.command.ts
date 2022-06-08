import { ICommand } from '@nestjs/cqrs';
import {
  UpdateClassroomsEnrollmentDTO,
  UpdateClassroomsEnrollmentDataDTO,
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
