import { ICommand } from '@nestjs/cqrs';

import {
  RemovePageDTO,
  RemovePageWhereDTO
} from '@/dtos/pages/remove-page.dto';

export class RemovePageCommand implements ICommand, RemovePageDTO {
  where: RemovePageWhereDTO;
  constructor(data: RemovePageDTO) {
    this.where = data.where;
  }
}
