import { ICommand } from '@nestjs/cqrs';

import { CreateClassroomsAdminDTO } from '@/dtos/classrooms-admins/create-classrooms-admin.dto';

export class CreateClassroomsAdminCommand
  implements ICommand, CreateClassroomsAdminDTO
{
  name: string;
  parent: string;

  constructor(data: CreateClassroomsAdminDTO) {
    this.name = data.name;
    this.parent = data.parent;
  }
}
