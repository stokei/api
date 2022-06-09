import { ICommand } from '@nestjs/cqrs';

import {
  RemoveImageDTO,
  RemoveImageWhereDTO
} from '@/dtos/images/remove-image.dto';

export class RemoveImageCommand implements ICommand, RemoveImageDTO {
  where: RemoveImageWhereDTO;
  constructor(data: RemoveImageDTO) {
    this.where = data.where;
  }
}
