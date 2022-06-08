import { ICommand } from '@nestjs/cqrs';
import {
  UpdateCoursesAdminDTO,
  UpdateCoursesAdminDataDTO,
  UpdateCoursesAdminWhereDTO
} from '@/dtos/courses-admins/update-courses-admin.dto';

export class UpdateCoursesAdminCommand
  implements ICommand, UpdateCoursesAdminDTO
{
  data: UpdateCoursesAdminDataDTO;
  where: UpdateCoursesAdminWhereDTO;
  constructor(data: UpdateCoursesAdminDTO) {
    this.data = data.data;
    this.where = data.where;
  }
}
