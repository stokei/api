import { ICommand } from '@nestjs/cqrs';

import {
  UpdateMetatagDataDTO,
  UpdateMetatagDTO,
  UpdateMetatagWhereDTO
} from '@/dtos/metatags/update-metatag.dto';

export class UpdateMetatagCommand implements ICommand, UpdateMetatagDTO {
  data: UpdateMetatagDataDTO;
  where: UpdateMetatagWhereDTO;
  constructor(data: UpdateMetatagDTO) {
    this.data = data.data;
    this.where = data.where;
  }
}
