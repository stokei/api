import { ICommand } from '@nestjs/cqrs';

import { CreateVideosSubtitleDTO } from '@/dtos/videos-subtitles/create-videos-subtitle.dto';

export class CreateVideosSubtitleCommand
  implements ICommand, CreateVideosSubtitleDTO
{
  name: string;
  parent: string;

  constructor(data: CreateVideosSubtitleDTO) {
    this.name = data.name;
    this.parent = data.parent;
  }
}
