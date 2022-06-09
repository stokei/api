import { ICommand } from '@nestjs/cqrs';

import {
  UpdateVideosTagDataDTO,
  UpdateVideosTagDTO,
  UpdateVideosTagWhereDTO
} from '@/dtos/videos-tags/update-videos-tag.dto';

export class UpdateVideosTagCommand implements ICommand, UpdateVideosTagDTO {
  data: UpdateVideosTagDataDTO;
  where: UpdateVideosTagWhereDTO;
  constructor(data: UpdateVideosTagDTO) {
    this.data = data.data;
    this.where = data.where;
  }
}
