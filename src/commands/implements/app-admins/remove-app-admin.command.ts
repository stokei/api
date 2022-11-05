import { ICommand } from '@nestjs/cqrs';

import {
  RemoveAppAdminDTO,
  RemoveAppAdminWhereDTO
} from '@/dtos/app-admins/remove-app-admin.dto';

export class RemoveAppAdminCommand implements ICommand, RemoveAppAdminDTO {
  where: RemoveAppAdminWhereDTO;
  constructor(data: RemoveAppAdminDTO) {
    this.where = data.where;
  }
}
