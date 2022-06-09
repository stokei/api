import { ICommand } from '@nestjs/cqrs';

import {
  RemoveVideosTagDTO,
  RemoveVideosTagWhereDTO
} from '@/dtos/videos-tags/remove-videos-tag.dto';

export class RemoveVideosTagCommand implements ICommand, RemoveVideosTagDTO {
  where: RemoveVideosTagWhereDTO;
  constructor(data: RemoveVideosTagDTO) {
    this.where = data.where;
  }
}
