import { ICommand } from '@nestjs/cqrs';

import {
  UpdateAppDataDTO,
  UpdateAppDTO,
  UpdateAppWhereDTO
} from '@/dtos/apps/update-app.dto';

export class UpdateAppCommand implements ICommand, UpdateAppDTO {
  data: UpdateAppDataDTO;
  where: UpdateAppWhereDTO;
  constructor(data: UpdateAppDTO) {
    this.data = data.data;
    this.where = data.where;
  }
}
