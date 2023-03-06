import { ICommand } from '@nestjs/cqrs';

import {
  RemoveRoleDTO,
  RemoveRoleWhereDTO
} from '@/dtos/roles/remove-role.dto';

export class RemoveRoleCommand implements ICommand, RemoveRoleDTO {
  where: RemoveRoleWhereDTO;
  constructor(data: RemoveRoleDTO) {
    this.where = data.where;
  }
}
