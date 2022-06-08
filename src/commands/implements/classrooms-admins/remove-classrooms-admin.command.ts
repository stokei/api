import { ICommand } from '@nestjs/cqrs';
import {
  RemoveClassroomsAdminDTO,
  RemoveClassroomsAdminWhereDTO
} from '@/dtos/classrooms-admins/remove-classrooms-admin.dto';

export class RemoveClassroomsAdminCommand
  implements ICommand, RemoveClassroomsAdminDTO
{
  where: RemoveClassroomsAdminWhereDTO;
  constructor(data: RemoveClassroomsAdminDTO) {
    this.where = data.where;
  }
}
