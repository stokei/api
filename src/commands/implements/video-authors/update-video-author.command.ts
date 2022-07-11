import { ICommand } from '@nestjs/cqrs';

import {
  UpdateVideoAuthorDataDTO,
  UpdateVideoAuthorDTO,
  UpdateVideoAuthorWhereDTO
} from '@/dtos/video-authors/update-video-author.dto';

export class UpdateVideoAuthorCommand
  implements ICommand, UpdateVideoAuthorDTO
{
  data: UpdateVideoAuthorDataDTO;
  where: UpdateVideoAuthorWhereDTO;
  constructor(data: UpdateVideoAuthorDTO) {
    this.data = data.data;
    this.where = data.where;
  }
}
