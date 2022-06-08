import { ICommand } from '@nestjs/cqrs';
import {
  RemoveCoursesAdminDTO,
  RemoveCoursesAdminWhereDTO
} from '@/dtos/courses-admins/remove-courses-admin.dto';

export class RemoveCoursesAdminCommand
  implements ICommand, RemoveCoursesAdminDTO
{
  where: RemoveCoursesAdminWhereDTO;
  constructor(data: RemoveCoursesAdminDTO) {
    this.where = data.where;
  }
}
