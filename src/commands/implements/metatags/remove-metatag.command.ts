import { ICommand } from '@nestjs/cqrs';

import {
  RemoveMetatagDTO,
  RemoveMetatagWhereDTO
} from '@/dtos/metatags/remove-metatag.dto';

export class RemoveMetatagCommand implements ICommand, RemoveMetatagDTO {
  where: RemoveMetatagWhereDTO;
  constructor(data: RemoveMetatagDTO) {
    this.where = data.where;
  }
}
