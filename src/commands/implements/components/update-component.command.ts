import { ICommand } from '@nestjs/cqrs';

import {
  UpdateComponentDataDTO,
  UpdateComponentDTO,
  UpdateComponentWhereDTO
} from '@/dtos/components/update-component.dto';

export class UpdateComponentCommand implements ICommand, UpdateComponentDTO {
  data: UpdateComponentDataDTO;
  where: UpdateComponentWhereDTO;
  constructor(data: UpdateComponentDTO) {
    this.data = data.data;
    this.where = data.where;
  }
}
