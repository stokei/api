import { ICommand } from '@nestjs/cqrs';

import {
  UpdateVideoDataDTO,
  UpdateVideoDTO,
  UpdateVideoWhereDTO
} from '@/dtos/videos/update-video.dto';

export class UpdateVideoCommand implements ICommand, UpdateVideoDTO {
  data: UpdateVideoDataDTO;
  where: UpdateVideoWhereDTO;
  constructor(data: UpdateVideoDTO) {
    this.data = data.data;
    this.where = data.where;
  }
}
