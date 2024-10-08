import { ICommand } from '@nestjs/cqrs';

import {
  UpdatePageDataDTO,
  UpdatePageDTO,
  UpdatePageWhereDTO
} from '@/dtos/pages/update-page.dto';

export class UpdatePageCommand implements ICommand, UpdatePageDTO {
  data: UpdatePageDataDTO;
  where: UpdatePageWhereDTO;
  constructor(data: UpdatePageDTO) {
    this.data = data.data;
    this.where = data.where;
  }
}
