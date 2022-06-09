import { ICommand } from '@nestjs/cqrs';

import { CreateCoursesAdminDTO } from '@/dtos/courses-admins/create-courses-admin.dto';

export class CreateCoursesAdminCommand
  implements ICommand, CreateCoursesAdminDTO
{
  name: string;
  parent: string;

  constructor(data: CreateCoursesAdminDTO) {
    this.name = data.name;
    this.parent = data.parent;
  }
}
