import { ICommand } from '@nestjs/cqrs';
import {
  UpdateVideosAuthorDTO,
  UpdateVideosAuthorDataDTO,
  UpdateVideosAuthorWhereDTO
} from '@/dtos/videos-authors/update-videos-author.dto';

export class UpdateVideosAuthorCommand
  implements ICommand, UpdateVideosAuthorDTO
{
  data: UpdateVideosAuthorDataDTO;
  where: UpdateVideosAuthorWhereDTO;
  constructor(data: UpdateVideosAuthorDTO) {
    this.data = data.data;
    this.where = data.where;
  }
}
