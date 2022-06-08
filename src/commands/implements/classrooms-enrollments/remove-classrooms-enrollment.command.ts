import { ICommand } from '@nestjs/cqrs';
import {
  RemoveClassroomsEnrollmentDTO,
  RemoveClassroomsEnrollmentWhereDTO
} from '@/dtos/classrooms-enrollments/remove-classrooms-enrollment.dto';

export class RemoveClassroomsEnrollmentCommand
  implements ICommand, RemoveClassroomsEnrollmentDTO
{
  where: RemoveClassroomsEnrollmentWhereDTO;
  constructor(data: RemoveClassroomsEnrollmentDTO) {
    this.where = data.where;
  }
}
