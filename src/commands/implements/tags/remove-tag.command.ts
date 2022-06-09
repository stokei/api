import { ICommand } from '@nestjs/cqrs';

import { RemoveTagDTO, RemoveTagWhereDTO } from '@/dtos/tags/remove-tag.dto';

export class RemoveTagCommand implements ICommand, RemoveTagDTO {
  where: RemoveTagWhereDTO;
  constructor(data: RemoveTagDTO) {
    this.where = data.where;
  }
}
