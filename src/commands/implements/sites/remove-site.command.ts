import { ICommand } from '@nestjs/cqrs';

import {
  RemoveSiteDTO,
  RemoveSiteWhereDTO
} from '@/dtos/sites/remove-site.dto';

export class RemoveSiteCommand implements ICommand, RemoveSiteDTO {
  where: RemoveSiteWhereDTO;
  constructor(data: RemoveSiteDTO) {
    this.where = data.where;
  }
}
