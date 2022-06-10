import { ICommand } from '@nestjs/cqrs';

import {
  RefreshAccessDTO,
  RefreshAccessWhereDTO
} from '@/dtos/accesses/refresh-access.dto';

export class RefreshAccessCommand implements ICommand, RefreshAccessDTO {
  where: RefreshAccessWhereDTO;
  constructor(data: RefreshAccessDTO) {
    this.where = data.where;
  }
}
