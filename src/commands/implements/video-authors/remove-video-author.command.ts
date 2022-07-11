import { ICommand } from '@nestjs/cqrs';

import {
  RemoveVideoAuthorDTO,
  RemoveVideoAuthorWhereDTO
} from '@/dtos/video-authors/remove-video-author.dto';

export class RemoveVideoAuthorCommand
  implements ICommand, RemoveVideoAuthorDTO
{
  where: RemoveVideoAuthorWhereDTO;
  constructor(data: RemoveVideoAuthorDTO) {
    this.where = data.where;
  }
}
