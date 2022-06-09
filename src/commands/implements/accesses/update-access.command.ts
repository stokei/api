import { ICommand } from '@nestjs/cqrs';

import {
  UpdateAccessDataDTO,
  UpdateAccessDTO,
  UpdateAccessWhereDTO
} from '@/dtos/accesses/update-access.dto';

export class UpdateAccessCommand implements ICommand, UpdateAccessDTO {
  data: UpdateAccessDataDTO;
  where: UpdateAccessWhereDTO;
  constructor(data: UpdateAccessDTO) {
    this.data = data.data;
    this.where = data.where;
  }
}
