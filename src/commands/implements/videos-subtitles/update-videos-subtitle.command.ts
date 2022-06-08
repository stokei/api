import { ICommand } from '@nestjs/cqrs';
import {
  UpdateVideosSubtitleDTO,
  UpdateVideosSubtitleDataDTO,
  UpdateVideosSubtitleWhereDTO
} from '@/dtos/videos-subtitles/update-videos-subtitle.dto';

export class UpdateVideosSubtitleCommand
  implements ICommand, UpdateVideosSubtitleDTO
{
  data: UpdateVideosSubtitleDataDTO;
  where: UpdateVideosSubtitleWhereDTO;
  constructor(data: UpdateVideosSubtitleDTO) {
    this.data = data.data;
    this.where = data.where;
  }
}
