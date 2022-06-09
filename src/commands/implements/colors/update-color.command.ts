import { ICommand } from '@nestjs/cqrs';

import {
  UpdateColorDataDTO,
  UpdateColorDTO,
  UpdateColorWhereDTO
} from '@/dtos/colors/update-color.dto';

export class UpdateColorCommand implements ICommand, UpdateColorDTO {
  data: UpdateColorDataDTO;
  where: UpdateColorWhereDTO;
  constructor(data: UpdateColorDTO) {
    this.data = data.data;
    this.where = data.where;
  }
}
