import { ICommand } from '@nestjs/cqrs';

import {
  UpdateClassroomsAdminDataDTO,
  UpdateClassroomsAdminDTO,
  UpdateClassroomsAdminWhereDTO
} from '@/dtos/classrooms-admins/update-classrooms-admin.dto';

export class UpdateClassroomsAdminCommand
  implements ICommand, UpdateClassroomsAdminDTO
{
  data: UpdateClassroomsAdminDataDTO;
  where: UpdateClassroomsAdminWhereDTO;
  constructor(data: UpdateClassroomsAdminDTO) {
    this.data = data.data;
    this.where = data.where;
  }
}
