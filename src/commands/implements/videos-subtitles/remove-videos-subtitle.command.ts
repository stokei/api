import { ICommand } from '@nestjs/cqrs';
import {
  RemoveVideosSubtitleDTO,
  RemoveVideosSubtitleWhereDTO
} from '@/dtos/videos-subtitles/remove-videos-subtitle.dto';

export class RemoveVideosSubtitleCommand
  implements ICommand, RemoveVideosSubtitleDTO
{
  where: RemoveVideosSubtitleWhereDTO;
  constructor(data: RemoveVideosSubtitleDTO) {
    this.where = data.where;
  }
}
